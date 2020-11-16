import React, { useState } from 'react'

import Search from './components/Search';
import { dishesData } from '../../data/dishes.js'

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

export default function HomePage() {
    const [searchPrefix, changeSearchPrefix] = useState("");
    // const [listVisible, changeListVisible] = useState(false);

    // let match = useRouteMatch();


    const handleKeyPress = (e) => {
        if(e.which === 13){
            console.log(searchPrefix);
        }
    }
    const handleChange = (e) => {
        changeSearchPrefix(e.target.value);
    }

    const SearchBox = () => (
        <div className="field">
            <div className="control has-icons-left">
                <input
                    className="input is-large" 
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    // onFocus={ (e) => {
                    //     console.log("A")
                    //     changeListVisible(true)
                    // }}
                    // onBlur={ () => changeListVisible(false)}
                    type="text" 
                    placeholder="Buscar"/>

                <span className="icon is-left">
                    <FaSearch/>
                </span>
            </div>
        </div>
    )

    return (
        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column is-full-mobile is-half-tablet is-one-third-desktop is-one-third-widescreen">
                        <div className="box">
                            <div className="header title is-4">Recetas</div>
                        </div>
                    </div>
                    <div className="column">
                        <SearchBox/>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="columns">
                    <div className="column is-full-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen">
                    {/* style={{display: listVisible?'initial':'none'}} */}
                        <div className="box"> 
                            <DishesList
                                prefix={searchPrefix}/>
                        </div>
                    </div>
                    <div className="column">
                        <div className="box">
                            <Switch>
                                {/* {console.log(dishesData)} */}
                                <Route path='/recetas/:id' component={DishPage}/>

                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}