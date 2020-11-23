// const { parse } = require('../tools/markdown');
const { readFileSync, readdirSync, writeFileSync } = require('fs');
const { type } = require('os');
const { parse, join } = require('path');

const hideMetadata = false;
const base = 'tests'
const dir = 'files';
const dishesDataPath = 'src/data/dishes.js';
const gifsDataPath = 'src/data/gifs.js';

const getMarkdown = ( filePath ) => {
    let mdString = readFileSync(filePath).toString()
    let md = mdString.split('\n\n');
    return md;
}
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 
const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

const process = (filePath) => {
    

    const data = {
        contentType: 'markdown',
        url: '',
        title: '',
        content: [],
        nutricionalInformation: [],
        aproxTime: '',
        capacity: '',
        tags: [],
        description: '',
        author: '',
        img:{},
        lito: false
    }

    let md = getMarkdown(filePath);

    data.title = md[0].replace('# ', '');
    delete md[0];
    
    //EXTRACT NUTITIONAL INFORMATION
    const nutInfoItem = md.findIndex( (text) => text == '## Información nutricional');
    if(nutInfoItem !== -1 && md[nutInfoItem+1] != ''){
        let nutInfo = md[nutInfoItem+1];
        nutInfo = nutInfo.replace(/- /g, ''); // remove bullet item '- 3.9*g*champiñón' -> '3.9*g*champiñón'
        data.nutricionalInformation = nutInfo.split('\n');
        delete md[nutInfoItem];
        delete md[nutInfoItem+1];
    }
    const tipsIndex = md.findIndex( (text) => text == '## Tips');
    if(tipsIndex !== -1 && md[tipsIndex+1] != ''){
        delete md[tipsIndex];
        delete md[tipsIndex+1];
    }
    data.aproxTime = extractInline(md, ['Tiempo de preparación', 'Tiempo de preparación:']);
    data.capacity = extractInline(md, ['Capacidad', 'Capacidad:']);

    let metadata = md[1].split('\n');
    data.author = extractInline(metadata, 'Autor:');
    data.description = extractInline(metadata, 'Descripción:');
    data.lito = extractInline(metadata, 'Lito:');
    if(extractInline(metadata, 'Tags:'))
        data.tags = extractInline(metadata, 'Tags:').split(', ');

    data.aproxTime = extractInline(md, 'TiempoAprox') || data.aproxTime;
    data.capacity = extractInline(md, 'Personas') || data.capacity;
    delete md[1] // metadata is on second pos
    
    data.url = 
        encodeURI(
            removeAccents(
                toTitleCase(data.title)
            ).replace(/ /g, '')
        );

    md = md.filter( text => text !== undefined);
    data.content = md;
    return data;
}
const searchLink = (items = [''], link = '') => items.find( item => item.toLowerCase().includes(link.toLowerCase()))

const getLink = (items = [''], linkPrefix = '') => {
    let link = searchLink(items, linkPrefix)
    link = link.slice(link.indexOf('(')+1, link.indexOf(')'));
    // link = link.replace(/%20/g, " ");
    link = decodeURI(link);
    return link;
}

const processCSV = (filePath = "", mainKey) => {
    let fileData = readFileSync(join(base, dir, filePath)).toString().replace(/\r/g, '').split("\n");
    let data = {};
    let keys = fileData[0].split(',');
    let mainKeyIndex = 0;

    if(typeof(mainKey) === 'string')
        if(keys.includes(mainKey))
            mainKeyIndex = keys.findIndex(key => key === mainKey);
    if(typeof(mainKey) == "number")
        if(mainKey < keys.length)
            mainKeyIndex = mainKey;

    fileData.shift() // remove first (0)
    fileData.forEach( d => {
        let args = d.split(',');
        let name = args[mainKeyIndex];

        if(!name || name === '') return;
        data[name] = {};
        args.forEach( (arg, index) => {
            if(index === mainKeyIndex || !keys[index]) return;
            let key = keys[index].trim()
            data[name][key] = arg;
        })
    })
    return data;
}
const processDish = (path, medidas, nutritionalData) => {
    let key = '';
    let receta = process(path);
    // console.log(receta)
    // console.log(medidas)
    let ingredientes = {};
    receta.nutricionalInformation.forEach(ingredient => {
        let [cantidad, medidaKey, ingrediente] = ingredient.split('*');
        if(cantidad.includes('〰') || ingrediente === '') return; // si es opcional
        
        let medida = medidas[medidaKey];
        let nutData = nutritionalData[ingrediente]
        if(!nutData) return; // si no encuentra el ingrediente
        let nutrientes = nutData.nutrients;

        Object.keys(nutrientes).forEach( nutKey => {
            let nutXgram = nutrientes[nutKey]/nutData.g;
            nutrientes[nutKey] = nutXgram*medida.g*cantidad;
            if(nutrientes[nutKey] === 0) delete nutrientes[nutKey]
        })

        nutrientes = nutrientes
        ingredientes[ingrediente] = nutrientes;
        // return {[ingrediente]:nutrientes};
    })
    receta.nutricionalInformation = ingredientes;
    receta.content = receta.content.join('\n\n')
    // let informaciónNutrimental = Object.values(nutrientes)
    //console.log(receta)
    return receta;
}


const main = async () => {

    let dirItems = readdirSync(join(base, dir));
    
    let mdFilename = dirItems.find( item => parse(item).ext == '.md') // search for md file
    let mdFile = getMarkdown(join(base, dir, mdFilename));

    let key = '';
    let medidas = {
        [key]: {g: 0}
    }
    medidas = processCSV(getLink(mdFile, 'medidas'));

    let nutritionalData = {
        [key]: {
            g: 0,
            nutrients: {
                [key]: 0
            }
        }
    }
    let nutData = processCSV(getLink(mdFile, 'Información Nutrimental'), 1);

    let gKey = 'gramos';
    Object.keys(nutData).forEach( nutrientKey => {
        // console.log(nutrientKey, nutData[nutrientKey], nutData[nutrientKey][gKey])
        nutritionalData[nutrientKey] = {
            g: nutData[nutrientKey][gKey],
            nutrients: nutData[nutrientKey]
        }
        delete nutritionalData[nutrientKey].nutrients[gKey]
    })
    // console.log(nutritionalData);
    let recetasLink = getLink(mdFile, 'Recetasdelamor');
    //let recetas = processCSV(recetasLink);
    let parsed = parse(recetasLink);

    let recetasDir = join(base, dir, parsed.dir, parsed.name);
    let recetas = readdirSync(recetasDir);
    let recetasData = recetas.map( recetaPath => processDish(join(recetasDir, recetaPath), medidas, nutritionalData))
    
    recetasData = recetasData.filter(receta => receta.lito === "Yes");

    let json = `export const dishesData =${JSON.stringify(recetasData, null, 2)}`
    writeFileSync(dishesDataPath, json);
    // console.log(json)

    let gifsLink = getLink(mdFile, 'ParaMatarElTiempo')
    

    let gifsData = readFileSync(join(base, dir, gifsLink)).toString().replace(/\r/g, '').split("\n");
    
    let gifs = [ {text: '', url: ''} ]
    gifs = [];

    gifsData.shift() // remove first (0)
    gifs = gifsData.map( d => {
        let [x, url, ...text] = d.split(',');
        text = text.join(' ');
        return {text, url };
    })
    
    writeFileSync(gifsDataPath, `export const gifsData =${JSON.stringify(gifs, null, 2)}`);
    // console.log(gifs)
}

main();
