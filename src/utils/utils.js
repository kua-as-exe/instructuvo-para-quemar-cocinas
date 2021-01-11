export const tagsColors = ["is-success", "is-link", "is-light", "is-black", "is-dark", "is-primary", "is-info", "is-danger", "is-warning", "is-primary is-light", "is-warning is-light", "is-danger is-light", "is-success is-light", "is-info is-light", "is-link is-light"];
export const random = (list) => list[Math.floor((Math.random()*list.length))]
export const removeAccents = (str) =>  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
export const toTileCase = (phrase) => 
    phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
export const uniqueName = (name) => removeAccents(toTileCase(name).replace(/ /g, ''))