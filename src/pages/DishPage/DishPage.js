import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import EditorJs from 'react-editor-js';

import { useRouteMatch } from 'react-router-dom';
import { dishesData, morsito } from './../../data/dishes';
import { Box, Columns, Container, Content, Heading, Tag, Tile } from '../../components/shared/Bluma';
import { EDITOR_JS_TOOLS } from '../../components/shared/EditorJsTools';

const get_random = function (list) {
    return list[Math.floor((Math.random()*list.length))];
  } 
  
const noContentFrases = [
    'BUSCA OTRA O PREGUNTALE A LA ABUE 👵',
    'Otro día más que no podré comer 😥'
]

function DishPage(props) {
    let match = useRouteMatch();
    let route = match.path.split("/");
    let dishUrl = route[route.length-1];

    let dishData = dishesData.find( dish => dish.url === dishUrl);
    console.log(dishData);

    const getTags = () => 
        dishData.tags.map( tag => (
            <Tag key={tag}>{tag}</Tag>
        ))

    const getInfo = () => (
            <div className="content is-medium">
                <h2 className="subtitle is-4">{dishData.fecha}</h2>
                <h1 className="title">{dishData.title}</h1>
                <h2 className="subtitle is-6">{dishData.author}</h2>
                <p>{dishData.description}</p>
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
            <Box>
                <h1>Hola</h1>   
            </Box>          
        </>
    )

    const subscribe = () => (
        <section className="section">
            <div className="columns">
            <div className="column is-10 is-offset-1">
                <div className="container has-text-centered is-fluid">
                <div className="hero is-light">
                    <div className="hero-body">
                    <h2 className="title is-4">Sign up for our newsletter</h2>
                        <div className="column is-6 is-offset-3">
                        <div className="field has-addons has-addons-centered">
                            <div className="control is-expanded">
                            <input className="input " type="text" placeholder="Email address"/>
                            </div>
                            <div className="control">
                            <a className="button is-info">
                                Subscribe
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
    )

    const receta = () => (
        <div className="column is-9 is-offset-1">
            {
                dishData.contentType === "markdown" &&
                    <ReactMarkdown children={dishData.content}/>
            }
            {
                dishData.contentType === "editorjs" &&
                    <EditorJs
                        readOnly={true}
                        tools={EDITOR_JS_TOOLS} 
                        data={morsito}/>
            }
        </div>
    )

    const surpriseEmoji = () => {
        return <span>&#128560;</span>
    }

    const noReceta = () => (
            <div className="column is-9 is-offset-1">
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                    <Heading size={3}>Wops!</Heading>
                    <Heading size={4}>Parece que aún no hay procedimiento para esta receta {surpriseEmoji()} </Heading>
                    <Heading subtitle size={5}>Nimodo!</Heading>
                    <Heading subtitle size={4}>{get_random(noContentFrases).toLowerCase()}</Heading>
                    </div>
                </div>
            </section>
            </div>
    )

    return (
        <>

            <section className="hero ">
                <div className="hero-body">
                    <div className="container">
                        {/**toolbar()**/}
                        <div className="columns">
                            <div className="column is-6">
                                {getImg()}
                            </div>
                            <div className="column is-6">
                                {getInfo()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            <section className="hero animate__animated animate__fadeIn">
                <Content className="container columns">
                    {(dishData.content && dishData.contentType)? receta() : noReceta() }
                    <div className="column is-3 ">
                        <Box>
                            <h1>Sugerencias</h1>
                        </Box>
                    </div>
                </Content>
            </section>

        </>
    )
}

DishPage.propTypes = {

}

export default DishPage

