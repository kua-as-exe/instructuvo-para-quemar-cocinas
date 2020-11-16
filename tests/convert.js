// const { parse } = require('../tools/markdown');
const { readFileSync, readdirSync } = require('fs');
const { parse, join } = require('path');

const hideMetadata = true;
const base = 'tests'
const dir = 'files';

const getMarkdown = ( filePath ) => {
    let mdString = readFileSync(filePath).toString()
    let md = mdString.split('\n\n');
    return md;
}

const process = (filePath) => {
    const extractInline = (md = [""], ocurrence = "") => {
        let text = '';
        let index = md.findIndex( (text) => text && text.includes(ocurrence));
        if(index !== -1){
            text = md[index];
            text = text.slice(text.indexOf(ocurrence)+ocurrence.length, text.length).trim();
            delete md[index];
        }
        return text;
    }

    const data = {
        type: 'markdown',
        title: '',
        content: [],
        nutricionalInformation: [],
        aproxTime: '',
        capacity: ''
    }

    let md = getMarkdown(filePath);

    data.title = md[0].replace('# ', '');
    delete md[0];
    if(hideMetadata) delete md[1] // metadata is on second pos
    
    //EXTRACT NUTITIONAL INFORMATION
    const nutInfoItem = md.findIndex( (text) => text == '## Información nutricional');
    if(nutInfoItem !== -1 && md[nutInfoItem+1] != ''){
        let nutInfo = md[nutInfoItem+1];
        nutInfo = nutInfo.replace(/- /g, ''); // remove bullet item '- 3.9*g*champiñón' -> '3.9*g*champiñón'
        data.nutricionalInformation = nutInfo.split('\n');
        delete md[nutInfoItem];
        delete md[nutInfoItem+1];
    }

    data.aproxTime = extractInline(md, 'Tiempo de preparación:');
    data.capacity = extractInline(md, 'Capacidad');

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
    let recetas = processCSV(getLink(mdFile, 'Recetasdelamor'));
    
    let receta = process('./tests/Crema de champiñones bf43549a6fbe44b69f1795a295950e9e.md');
    // console.log(receta)
    // console.log(medidas)
    let ingredientes = {
        [key]: {
            [key]: 0
        }
    };
    receta.nutricionalInformation.forEach(ingredient => {
        let [cantidad, medidaKey, ingrediente] = ingredient.split('*');
        if(cantidad.includes('〰')) return; // si es opcional
        
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
    
    // let informaciónNutrimental = Object.values(nutrientes)
    console.log(ingredientes)
    
}

main();