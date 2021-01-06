import React from 'react';

import ReactGA from 'react-ga';

const TipsPage = () => {
    ReactGA.pageview('/recetas')
    // console.log("A")
    return (
        <section className="hero is-primary is-medium">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <h1 className="title">
                        Próximamente
                    </h1>
                    <h2 className="subtitle">
                        Ideas que mejorarán tu vida
                    </h2>
                </div>
            </div>
            <div className="hero-foot mb-3">
                <div className="container has-text-centered">
                    <p>Apoyanos compartiendo para motivarnos a seguir desarrollando este proyecto <span role="img" aria-label="emoji de fantasma">👻</span></p>
                </div>
            </div>
        </section>
    )
}

export default TipsPage;