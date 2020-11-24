import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import EditorJs from 'react-editor-js';

import { Redirect, useLocation, useParams, useRouteMatch, withRouter } from 'react-router-dom';
import { dishesData } from './../../data/dishes';
import { Box, Columns, Container, Content, Heading, Tag, Tile } from '../../components/shared/Bluma';
import { EDITOR_JS_TOOLS } from '../../components/shared/EditorJsTools';
import { random, tagsColors } from '../../utils/utils';
import { gifsData } from '../../data/gifs';
import eastereggs, { recetasEastereggs } from '../DishesPage/eastereggs';
import { FaClock } from 'react-icons/fa';
  
const noContentFrases = [
    'BUSCA OTRA O PREGUNTALE A LA ABUE 👵',
    'Otro día más que no podré comer 😥'
]

function DishPage() {
    let { id } = useParams();

    if(recetasEastereggs[id])
        return (
            <div className="container">
                <div className="p-3 content is-active is-align-content-center disable-select">
                    <figure className="is-fullwidth mt-0">
                        {recetasEastereggs[id]}
                    </figure>
                </div>
            </div>
        )

    let dishData = dishesData.find( dish => dish.url === id);
    
    if(!dishData)
        return <Redirect to="/recetas/"/>
         
    const Tags = React.memo(() => 
        dishData.tags && <div className="tags mb-0">
            {dishData.tags.map( tag => (
                <span key={tag} className={`tag ${random(tagsColors)}`} >{tag}</span>
            ))}
        </div>
    , ()=>true)

    const getInfo = () => (
        <div className="content is-medium">
                <h1 className="title">{dishData.title}</h1>
                {dishData.author && <h2 className="subtitle is-6">{dishData.author}</h2>}
                <small><FaClock/> {dishData.aproxTime}</small>
                <p>{dishData.description}</p>
                <Tags/>
            </div>
        )
    
    const getImg = () => (
        <figure className="image is-16by9">
            <img src={dishData.img.url} alt={dishData.title}/>
        </figure>
    )

    const toolbar = () => (
        <>
            <div className="box">
                <h1>Hola</h1>   
            </div>          
        </>
    )

    const receta = () => (
        <div className="container column">
            {
                dishData.contentType === "markdown" &&
                    <ReactMarkdown children={dishData.content}/>
            }
            {
                dishData.contentType === "editorjs" &&
                    <EditorJs
                        readOnly={true}
                        tools={EDITOR_JS_TOOLS} 
                        data={{}}/>
            }
        </div>
    )

    const surpriseEmoji = ['😢','😨','😵','☹','😓','😩']

    const noReceta = () => (
            <div className="column">
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <Heading size={3}>Wops!</Heading>
                        <Heading size={4}>Parece que aún no hay procedimiento para esta receta {random(surpriseEmoji)} </Heading>
                        <Heading subtitle size={5}>Nimodo!</Heading>
                        <Heading subtitle size={4}>{random(noContentFrases).toLowerCase()}</Heading>
                    </div>
                </div>
            </section>
            </div>
    )

    const Gif = () => {
        const [gif, setGif] = useState(random(gifsData))
        let {text, url} = gif;
        // console.log(text, url)
        return (
            <div className="p-3 content is-active is-align-content-center disable-select">
                <figure className="is-fullwidth mt-0 mb-0">
                    <p className="title is-4 has-text-centred"><em>{text}</em></p>
                    <img src={url} alt={text}/>
                </figure>
                <figure className="mt-2">
                    <button 
                        className="button is-medium is-warning"
        onClick={()=>setGif(random(gifsData))}>{random(['¡Otro!', 'A ver hechate otro', 'Dime más', '¿Que hay de nuevo viejo?', 'Again!', ':)', 'Otaves'])}</button>
                </figure>
            </div>
        )
    }

    const Receta = () => (
        <>
         <section className="mb-5">
                <div className="container">
                    {/**toolbar()**/}
                    <div className="columns is-6">
                        { dishData.img && dishData.img.url && <div className="column is-6">
                            {getImg()}
                        </div>}
                        <div className="column">
                            {getInfo()}
                        </div>
                    </div>
                </div>
            </section>
        
            <section className="hero">
                <div className="content container ml-2 mr-2">
                    {(dishData.content && dishData.contentType)? receta() : noReceta() }
                    {dishData.lastChange && <h3 className="subtitle is-6 mt-0 has-text-centered">Última actualización: {new Date(dishData.lastChange).toLocaleDateString()}</h3>}
                </div>
            </section>

            <section>
                <div className="container">
                    <Gif/>
                </div>
            </section>
        </>
    )

    return (
        <>
           {dishData? <Receta/>: <>
            <h1>No hay sistema</h1>
           </>}

        </>
    )
}

DishPage.propTypes = {

}

export default DishPage

