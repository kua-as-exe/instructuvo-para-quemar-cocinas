import React, { useContext, useReducer, useState } from 'react'

import Search from './components/Search';
import { dishesData } from '../../data/dishes.js'
import { useMediaQuery } from 'react-responsive'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
  } from "react-router-dom";
import DishPage from '../DishPage/DishPage';
import { FaSearch } from 'react-icons/fa';
import DishesList from './components/DishesList';
import DishesHome from './components/DishesHome';
import ReactGA from 'react-ga';
import { recetasEastereggs } from './eastereggs';

function HomePage({history}) {
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
                    // onKeyPress={handleKeyPress}
                    onFocus={ () => changeListVisible(true)}
                    type="text" 
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
            <div className="container" >
                <div className="columns">
                    <div className="column is-full-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen" style={ (isMobile&&!listVisible)?{display: 'none'}:{}}>
                        <div className="box"> 
                            <DishesList 
                                prefix={searchPrefix}
                                select={handleSelect}/>
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
                                <Route path='/recetas/:id' component={DishPage}/>
                                <Route exact path='/recetas' component={DishesHome}/>

                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage;
// export default React.memo( HomePage, (a, b)=>{
//     console.log(a, b)
//     return true
// })