import React, { useState } from 'react'

// import Search from './components/Search';
// import { dishesData } from '../../data/dishes.js'
import { useMediaQuery } from 'react-responsive'

import {
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import DishPage from '../DishPage/DishPage';
import { FaSearch } from 'react-icons/fa';
import DishesList from './components/DishesList';
import DishesHome from './components/DishesHome';
import ReactGA from 'react-ga';
import { recetasEastereggs } from './eastereggs';
import useApi from 'use-http-api';


const Loading = React.memo(() => {
    const url = "https://media.giphy.com/media/Z8blEZs9alp16/giphy.gif"
    const text = "Cocinando tu recetario..."
    return (
        <div className="p-3 content is-active is-align-content-center disable-select">
            <figure className="mt-0 mb-0">
                <p className="title is-4 has-text-centred"><em>{text}</em></p>
                <img className="is-full-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen" src={url} alt={text}/>
            </figure>
        </div>
    )
})

function HomePage({history}) {
    const [{ initialLoad, loading, data: dishes, pendingOrLoading, error}, getUsers] = useApi({
        url: 'https://detech-notionapi.netlify.app/.netlify/functions/getCollectionData?id=1b489ba4bc6b4c4b963c7bca626dc497',
        defaultData: []
    });
    React.useEffect( () => {
        getUsers();
    }, []);
    React.useEffect( () => {
        console.log(dishes);
    }, [dishes])

    const isMobile = useMediaQuery({ query: '(max-width: 769px)' })
    const [searchPrefix, changeSearchPrefix] = useState("");
    const [listVisible, changeListVisible] = useState(false);
    const receta = React.useRef(null);

    const handleSelect = (urlOrData = {url: ''}) => {
        let url = (typeof(urlOrData) === "string")? urlOrData: urlOrData.url
        const urlLink = `/recetas/${url}`;
        history.push(urlLink);
        goTop();
        changeListVisible(false);
    }

    const handleChange = (e) => {
        if(recetasEastereggs[e.target.value.replace(/ /g, '')])
            handleSelect(e.target.value.replace(/ /g, ''));

        changeSearchPrefix(e.target.value)
    }

    const goTop = () => {
        if(receta.current) receta.current.scrollIntoView({
            behaviour: 'smooth',
            block: 'start',
            inline: 'center',
        });
    }

    const searchBox = () => (
        <div className="field">
            <div className="control has-icons-left">
                <input
                    className="input is-large" 
                    value={searchPrefix}
                    onChange={handleChange}
                    onFocus={ () => changeListVisible(true)}
                    type="text" 
                    disabled={initialLoad || loading}
                    placeholder="Buscar"/>

                <span className="icon is-left">
                    <FaSearch/>
                </span>
            </div>
        </div>
    );

    const analytics = React.useMemo( () => {
        // console.log("Analiticas")
        ReactGA.pageview('/recetas')
    }, [])

    return (
        <section className="section" ref={receta} id="inicio" >
            <div className="container">
                <div className="columns">
                    <div className="column is-full-mobile is-half-tablet is-one-third-desktop is-one-third-widescreen">
                        <Link className="box" to="/recetas" onClick={()=>changeSearchPrefix('')}>
                            <div className="header title is-4">Recetas</div>
                        </Link>
                    </div>
                    <div className="column">
                        {searchBox()}
                    </div>
                </div>
            </div>

            { loading ? 
            <Loading/>:
            <div className="container" >
                <div className="columns">
                    <div className="column is-full-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen" style={ (isMobile&&!listVisible)?{display: 'none'}:{}}>
                            <div className="box"> 
                            {   error?
                                    <div>ERROR</div>:
                                    <DishesList dishes={dishes} prefix={searchPrefix} select={handleSelect}/>
                            }
                        </div> 
                    </div>
                    <div className="column">
                        <div className="box">
                            <Switch>
                                {/* {console.log(dishesData)} */}
                                <Route exact path='/recetas/inicio'>
                                    {goTop()}
                                    {analytics}
                                    <Redirect to="/recetas"/>
                                </Route>
                                <Route path='/recetas/:id'>
                                    <DishPage dishes={dishes}/>
                                </Route>
                                <Route exact path='/recetas' component={DishesHome}/>

                            </Switch>
                        </div>
                    </div>
                </div>
            </div>}
        </section>
    )
}

export default HomePage;
// export default React.memo( HomePage, (a, b)=>{
//     console.log(a, b)
//     return true
// })