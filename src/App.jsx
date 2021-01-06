import React, { useEffect } from 'react';
import './css/App.scss';
//import './css/bulmaswatch.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavbarComponent from './components/shared/Navbar';

import {routes} from './router';
import Footer from './components/shared/Footer';

 import ReactGA from 'react-ga';
// history.listen(location => console.log(location));
function App() {
  useEffect(() => {
    // console.log("GA")
     ReactGA.initialize('G-H1QW6J6NFJ'); // Aqui pones tu identificador de cuenta de Google Analytics
    // console.log("A")
  }, [])

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
