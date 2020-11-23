const notionRoutes = require('./notionRoutes.json');
const { getMarkdown, processNotionMarkdown } = require('./utils');
const { readFileSync, readdirSync, writeFileSync } = require('fs');
const { join } = require('path');

const recetasPath = notionRoutes.recetas;
const dir = 'tools/a';

let recetasPaths = readdirSync(join(dir, recetasPath));
let recetas = recetasPaths.map( recetaPath => {
    return processNotionMarkdown(getMarkdown(join(dir, recetasPath, recetaPath)));
} )

console.log(recetas)
// console.log(mdData)