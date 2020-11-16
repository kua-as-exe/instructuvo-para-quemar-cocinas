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

const getMarkdown = async (filePath) => {
    const data = {
        type: 'markdown',
        content: [],
        nutricionalInformation: [],
        aproxTime: '',
        capacity: ''
    }

    let mdString = await readFileSync(filePath).toString()
    let md = mdString.split('\n\n');

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