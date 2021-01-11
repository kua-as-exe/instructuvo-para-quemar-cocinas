import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import EditorJs from 'react-editor-js';

import { Redirect, useLocation, useParams } from 'react-router-dom';
// import { dishesData } from './../../data/dishes';

import { EDITOR_JS_TOOLS } from '../../components/shared/EditorJsTools';
import { random, tagsColors, uniqueName } from '../../utils/utils';
import { gifsData } from '../../data/gifs';
import { recetasEastereggs } from '../DishesPage/eastereggs';
import { FaClock, FaUser, FaArrowLeft } from 'react-icons/fa';
import ReactGA from 'react-ga';
import Content from './Content';
import { Link } from 'react-router-dom';

const noContentFrases = [
    'BUSCA OTRA O PREGUNTALE A LA ABUE 👵',
    'Otro día más que no podré comer 😥'
]

function DishPage({dishes}) {
    let { id } = useParams();
    let {pathname} = useLocation();
    useEffect( () => {
        console.log(dishes)
        console.log(id)
        ReactGA.pageview(pathname);
    }, [pathname]);

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

    let dishData = dishes.find( dish => uniqueName(dish.Name) === id);
         
    const Tags = React.memo(() => 
        dishData.Tags && <div className="tags mb-0">
            {dishData.Tags.map( tag => (
                <span key={tag} className={`tag ${random(tagsColors)}`} >{tag}</span>
            ))}
        </div>
    , ()=>true)

    const Info = React.memo(({Name, Autor, TiempoAprox, Personas, Descripción}) => (
        <div className="content is-medium">
            <h1 className="title">{Name}</h1>
            {Autor && <h2 className="subtitle is-6">{Autor}</h2>}
            {TiempoAprox && <small><FaClock/> {TiempoAprox}  </small>}
            {Personas && <small><FaUser/> {Personas}  </small>}
            {Descripción && <p>{Descripción}</p>}
            <Tags/>
        </div>
    ))
    
    const getImg = () => (
        <figure className="image is-16by9">
            <img src={dishData.img.url} alt={dishData.title}/>
        </figure>
    )

    const DishContent = () => (
        <div className="">
            <Content id={dishData.id}/>
        </div>
    )

    const surpriseEmoji = ['😢','😨','😵','☹','😓','😩']

    const NoReceta = () => (
        <div className="column">
        <section className="hero">
            <div className="hero-body">
            <div className="container">
                <p className="title is-3">Wops!</p>
                <p className="title is-4">Esta receta no existe o ya no está disponible {random(surpriseEmoji)} </p>
                {/* <p className="is-5 subtitle">Nimodo!</p>
                <p className="is-4 subtitle">{random(noContentFrases).toLowerCase()}</p> */}
                <Link to="/recetas/" className="button is-primary">
                    <span className="icon is-small"> <FaArrowLeft/> </span>
                    <span>Explorar nuevas recetas</span>
                </Link>
            </div>
            </div>
        </section>
        </div>
    )

    const Gif = () => {
        let {text, url} = random(gifsData);
        return (
            <div className="p-3 content is-active is-align-content-center disable-select">
                <figure className="is-fullwidth mt-0 mb-0">
                    <p className="title is-4 has-text-centred"><em>{text}</em></p>
                    <img src={url} alt={text}/>
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
                    { dishData.img && dishData.img.url && 
                    <div className="column is-6">
                        {getImg()}
                    </div>}
                    <div className="column">
                        <Info {...dishData}/>
                    </div>
                </div>
            </div>
        </section>
    
        <section className="hero">
            <DishContent/>
            {dishData.lastChange && <h3 className="subtitle is-6 mt-0 has-text-centered">Última actualización: {new Date(dishData.lastChange).toLocaleDateString()}</h3>}
        </section>

        <section>
            <div className="container">
                <Gif/>
            </div>
        </section>
    </>)

    return dishData? <Receta/> : <NoReceta/>
}

DishPage.propTypes = {

}

export default DishPage

