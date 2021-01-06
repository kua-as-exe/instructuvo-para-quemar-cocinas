import React, { useState } from 'react'

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
        // eslint-disable-next-line
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
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <img className="logo" src="/favicon.png" alt="Logo" width="28" height="28"/>
                    <span><b>Instructivo para quemar cocinas</b></span>
                </Link>
                <ExpandButton/>
            </div>

            <div className={`navbar-menu ${isActive? 'is-active': ''}`}>
                {routes
                    .filter( route => (route.navbarVisible !== false) )
                    .map( route => link(route.text, route.path) )
                }
            </div>
        </nav>
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