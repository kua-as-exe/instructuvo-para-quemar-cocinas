const { readFileSync } = require('fs');

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
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 
const getMarkdown = (filePath) => readFileSync(filePath).toString()

const processNotionMarkdown = (markdown = '') => {
    let md = markdown.split('\n\n');
    
    let title = md[0].replace('# ', ''); // from "# Brownies" to "Brownies"
    delete md[0];

    let metadata = {};
    let metadataArray = md[1].split('\n');
    metadataArray.forEach( meta => { // turn the Array in to Object 
        // ['Autor: Elisabet Juarez'] => {Autor: 'Elisabet Juarez'}
        let [key, data] = meta.split(': ');
        metadata[key] = data;
    })
    delete md[1];

    let uri = encodeURI(
        removeAccents(
            toTitleCase(title)
        ).replace(/ /g, '')
    );

    md = md.filter( text => text !== undefined);

    let data = {
        uri,
        title,
        metadata,
        content: md.join('\n\n')
    }
    return data;
}
module.exports = {
    getMarkdown,
    extractInline,
    removeAccents,
    processNotionMarkdown
}

// const extractInline = (md = [""], ocurrences = []) => {
//     let text = '';
//     if(typeof(ocurrences) === 'string')
//         ocurrences = [ocurrences];

//     ocurrences.forEach( ocurrence => {  
//         let index = md.findIndex( (text) => text && text.includes(ocurrence));
//         if(index !== -1){
//             let t = md[index];
//             t = t.slice(t.indexOf(ocurrence)+ocurrence.length, t.length).trim();
//             if(t && t !== '') text = t;
//         }
//     })
//     return text;
// }