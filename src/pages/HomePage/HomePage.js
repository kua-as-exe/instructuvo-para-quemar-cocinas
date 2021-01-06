import React from 'react'
// import Tiles from './Tiles';
import Welcome from './Welcome';
import ReactGA from 'react-ga';

export default function HomePage() {
    ReactGA.pageview('/');
    return (
        <div className="section">
            <div className="container">
                <div className="hero is-primary is-uppercase">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Instructivo para quemar cocinas
                            </h1>
                            <h4 className="subtitle is-4">
                                Tu CAS de tips y recetas de cocina con la calidad y sabor mexicano
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="box">
                <Welcome/>

                </div>
            </div>
        </div>
    )
}
