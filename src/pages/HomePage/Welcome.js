import React from 'react'
import { Link } from 'react-router-dom';
// import { HashLink as Link } from 'react-router-hash-link';

const columnSize = 7;

export default function Welcome() {
    return (
        <div>
            <div className="hero">
                <div className="columns is-vcentered has-text-centered is-clipped">
                    <div className={`column is-${columnSize}`}>
                        <p className="title is-1">Núnca es tarde para aprender a cocinar</p>
                    </div>
                    <div className="column">
                        <img src={`img/people/${1}.png`} style={{marginRight: '-2rem'}}/>
                    </div>
                </div>

                <div className="columns is-vcentered has-text-centered">
                    <div className="column">
                        <img src={`img/people/${4}.png`}/>
                    </div>
                    <div className={`column is-${columnSize}`}>
                        <p className="title is-2">Hemos preparado un pequeño recetario para que puedas aprender desde tu hogar</p>
                    </div>
                </div>

                <div className="columns is-vcentered has-text-centered is-clipped">
                    <div className={`column is-${columnSize}`}>
                        <p className="title is-3">Con el toque exquisito tras encontrar la receta correcta</p>
                    </div>
                    <div className="column">
                        <img src={`img/people/${2}.png`}/>
                    </div>
                </div>

                <div className="columns is-vcentered has-text-centered">
                    <div className="column">
                        <img src={`img/people/${6}.png`}/>
                    </div>
                    <div className={`column is-${columnSize}`}>
                        <p className="title is-1">Acompáñame</p>
                        <Link className="button is-primary is-medium" to="/recetas/fromHome">Vamos!</Link>
                        <p className="is-7 p-3">- Liz Juarez</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
