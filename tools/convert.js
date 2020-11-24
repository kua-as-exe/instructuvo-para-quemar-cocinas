const notionRoutes = require('./notionRoutes.json');
const { getMarkdown, processNotionMarkdown } = require('./utils');
const { readFileSync, readdirSync, writeFileSync } = require('fs');
const { join } = require('path');

const recetasPath = notionRoutes.recetas;
const dir = 'tools/a';

let recetasPaths = readdirSync(join(dir, recetasPath));
let recetasData = recetasPaths.map( recetaPath => {
    return processNotionMarkdown(getMarkdown(join(dir, recetasPath, recetaPath)));
} )
console.log(recetasData)

let recetas = recetasData.map( receta => {
    const data = {
        "contentType": "markdown",
        "url": receta.uri,
        "title": receta.title,
        "content": receta.content,
        // "nutricionalInformation": {},
        "aproxTime": receta.metadata['TiempoAprox'],
        // "capacity": ": 10\nTags: Chocolate, Harina, Panesito, Postre\nTiempoAprox: 1 hora 15 minutos",
        "tags": receta.metadata['Tags']?receta.metadata['Tags'].split(', '): [],
        "description": receta.metadata['Descripción'],
        "author": receta.metadata['Autor'],
        "lito": receta.metadata['Lito'],
        lastChange: receta.metadata['Última modificación'],
        img:{}
      }
      return data
})
recetas = recetas.filter( receta => receta.lito === 'Yes');

const dishesDataPath = 'src/data/dishes.js';

// console.log(recetas)

let json = `export const dishesData =${JSON.stringify(recetas, null, 2)}`
writeFileSync(dishesDataPath, json);
// console.log(mdData)