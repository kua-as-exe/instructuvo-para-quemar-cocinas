import React from 'react'
import Navbar from 'react-bulma-components/lib/components/navbar';

import {
    Link,
    NavLink
  } from "react-router-dom";

const link = (text, route) => (
    <NavLink key={text} to={route} className="navbar-item">
        {text}
    </NavLink>
);


export default function NavbarComponent({routes}) {

    return (
        <Navbar>
            <Navbar.Brand>
                <Link to="/" className="navbar-item">
                    <img className="logo" src="/logo.png" alt="Logo" width="28" height="28"/>
                    <span><b>Instructivo para quemar cocinas</b></span>
                </Link>
            </Navbar.Brand>

            <Navbar.Menu>
                <Navbar.Container>
                    {routes.map( route => link(route.text, route.path))}
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