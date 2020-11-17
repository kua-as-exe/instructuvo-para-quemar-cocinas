import React, { useState } from 'react'

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

function HomePage({history}) {
    console.log("A")
    const isMobile = useMediaQuery({ query: '(max-width: 769px)' })
    const [searchPrefix, changeSearchPrefix] = useState("");
    const [listVisible, changeListVisible] = useState(false);
    const receta = React.useRef(null);

    const handleKeyPress = (e) => {
        if(e.which === 13){
            // console.log(searchPrefix);
        }
    }
    const handleChange = (e) => changeSearchPrefix(e.target.value);

    const goTop = () => {
        if(receta.current) receta.current.scrollIntoView({
            behaviour: 'smooth',
            block: 'start',
            inline: 'center',
        });
    }
    const handleSelect = (dishData) => {
        const urlLink = `/recetas/${dishData.url}`;
        history.push(urlLink);
        goTop();
        changeListVisible(false);
    }

    const searchBox = () => (
        <div className="field">
            <div className="control has-icons-left">
                <input
                    className="input is-large" 
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    onFocus={ () => changeListVisible(true)}
                    type="text" 
                    placeholder="Buscar"/>

                <span className="icon is-left">
                    <FaSearch/>
                </span>
            </div>
        </div>
    );

    return (
        <section className="section" ref={receta} id="inicio" >
            <div className="container">
                <div className="columns">
                    <div className="column is-full-mobile is-half-tablet is-one-third-desktop is-one-third-widescreen">
                        <Link className="box" to="/recetas">
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

export default React.memo(HomePage, ()=>true)