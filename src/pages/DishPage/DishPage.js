import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import EditorJs from 'react-editor-js';

import { Redirect, useParams, useRouteMatch, withRouter } from 'react-router-dom';
import { dishesData } from './../../data/dishes';
import { Box, Columns, Container, Content, Heading, Tag, Tile } from '../../components/shared/Bluma';
import { EDITOR_JS_TOOLS } from '../../components/shared/EditorJsTools';

const get_random = function (list) {
    return list[Math.floor((Math.random()*list.length))];
  } 
  
const noContentFrases = [
    'BUSCA OTRA O PREGUNTALE A LA ABUE 👵',
    'Otro día más que no podré comer 😥'
]

function DishPage() {
    let { id } = useParams();
    let dishData = dishesData.find( dish => dish.url === id);
    console.log(dishData);
    if(!dishData)
        return <Redirect to="/recetas/"/>

    const getTags = () => 
        dishData.tags && dishData.tags.map( tag => (
            <Tag key={tag}>{tag}</Tag>
        ))

    const getInfo = () => (
            <div className="content is-medium">
                {dishData.fecha && <h2 className="subtitle is-4">{dishData.fecha}</h2>}
                <h1 className="title">{dishData.title}</h1>
                {dishData.author && <h2 className="subtitle is-6">{dishData.author}</h2>
}                <p>{dishData.description}</p>
                <Tag.Group>
                    {getTags()}
                </Tag.Group>
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
                        <Heading size={4}>Parece que aún no hay procedimiento para esta receta {get_random(surpriseEmoji)} </Heading>
                        <Heading subtitle size={5}>Nimodo!</Heading>
                        <Heading subtitle size={4}>{get_random(noContentFrases).toLowerCase()}</Heading>
                    </div>
                </div>
            </section>
            </div>
    )

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
        
            <section className="hero animate__animated animate__fadeIn animate__fast">
                <div className="content container ml-2 mr-2">
                    {(dishData.content && dishData.contentType)? receta() : noReceta() }
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

