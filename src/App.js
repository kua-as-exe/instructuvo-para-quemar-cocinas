import React from 'react';
import './css/App.css';
import './css/bulmaswatch.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import NavbarComponent from './components/shared/Navbar';

import {routes} from './router';
import Footer from './pages/DishesPage/components/Footer';

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
      <Footer/>
    </div>
  );
}

export default App;
