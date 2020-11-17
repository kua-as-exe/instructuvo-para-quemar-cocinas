import React, { useState } from 'react'
import Navbar from 'react-bulma-components/lib/components/navbar';

import {
    Link,
    NavLink
  } from "react-router-dom";


export default function NavbarComponent({routes}) {

    const [isActive, setIsActive] = useState(false)
    
    const link = (text, route) => (
        <NavLink 
            key={text} 
            to={route} 
            className="navbar-item" 
            activeClassName="has-text-white"
            onClick={()=>setIsActive(false)}>
            {text}
        </NavLink>
    );

    const ExpandButton = () => (
        <a role="button" 
            className="navbar-burger burger" 
            aria-label="menu" 
            aria-expanded="false" 
            data-target="navbarBasicExample"
            onClick={ () => setIsActive(!isActive) }>

            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    )

    return (
        <Navbar>
            <Navbar.Brand>
                <Link to="/" className="navbar-item">
                    <img className="logo" src="/favicon.png" alt="Logo" width="28" height="28"/>
                    <span><b>Instructivo para quemar cocinas</b></span>
                </Link>
                <ExpandButton/>
            </Navbar.Brand>

            <div className={`navbar-menu ${isActive? 'is-active': ''}`}>
                <Navbar.Container>
                    {routes
                        .filter( route => (route.navbarVisible !== false) )
                        .map( route => link(route.text, route.path) )
                    }
                </Navbar.Container>
            </div>
        </Navbar>
    )
}


/*
                    <Navbar.Item dropdown hoverable>
                        
                        <Navbar.Link arrowless={true}>
                            Recetas
                        </Navbar.Link>
                        <Navbar.Dropdown>
                            {link('Desayuno', '/recetas')}
                            {link('Comida', '/recetas')}
                            {link('Cena', '/recetas')}
                        </Navbar.Dropdown>
                    </Navbar.Item>
                    */