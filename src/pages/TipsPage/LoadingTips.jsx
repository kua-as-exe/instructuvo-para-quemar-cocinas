import React from 'react'
import { random } from '../../utils/utils';

export default function() {
    const url = 'https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif';
    const text = random([
        'Cargando tips favoritos',
        'Buscando...',
        '¿Donde dejamos los tips?',
        'Creo que perdí los tips'
    ])
    return (
        <div className="p-3 content is-active is-align-content-center disable-select">
            <figure className="is-fullwidth mt-0 mb-0">
                <p className="title is-4 has-text-centred"><em>{text}</em></p>
                <img src={url} alt={text}/>
            </figure>
        </div>
    )
}
