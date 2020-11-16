import React from 'react'
import Navbar from 'react-bulma-components/lib/components/navbar';

import {
    Link,
    NavLink
  } from "react-router-dom";

const link = (text, route) => (
    <NavLink key={text} to={route} className="navbar-item" activeClassName="has-text-white">
        {text}
    </NavLink>
);


export default function NavbarComponent({routes}) {

    return (
        <Navbar>
            <Navbar.Brand>
                <Link to="/" className="navbar-item">
                    <img className="logo" src="/favicon.png" alt="Logo" width="28" height="28"/>
                    <span><b>Instructivo para quemar cocinas</b></span>
                </Link>
            </Navbar.Brand>

            <Navbar.Menu>
                <Navbar.Container>
                    {routes
                        .filter( route => (route.navbarVisible !== false) )
                        .map( route => link(route.text, route.path) )
                    }
                </Navbar.Container>
            </Navbar.Menu>
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