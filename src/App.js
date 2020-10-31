import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import NavbarComponent from './components/shared/Navbar';

import {routes} from './router';

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComponent routes={routes}/>

        <Switch>
          {routes.map( (route) => 
            <Route 
              key={route.path} 
              path={route.path} 
              component={route.component}/>
          )}
        </Switch>

      </Router>
    </div>
  );
}

export default App;
