import React from 'react'

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

export default function HomePage() {
    let match = useRouteMatch();

    return (
        
        <Switch>
            {dishesData.map( (route) => 
                <Route 
                    key={route.url} 
                    strict={true}
                    path={`${match.path}/${route.url}`}
                    component={DishPage}/>
            )}
            <Route exact={true} path={`${match.path}`} component={Search}/>
            <Redirect to="/recetas" />
        </Switch>
        
    )
}