import React from 'react';

import HomePage from './pages/HomePage/HomePage';
import DishesPage from './pages/DishesPage/DishesPage';
import DishPage from './pages/DishPage/DishPage';
import EditorPage from './pages/EditorPage/EditorPage';

export const routes = [
    {
        text: 'Recetas',
        path: '/recetas',
        component: DishesPage,
    },
    {

        
        text: 'Receta',
        path: '/receta',
        component: DishPage,
        navbarVisible: false
    },
    {
        text: 'Tips',
        path: '/tips',
        component: ()=>(
            <section class="hero is-primary is-medium">
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <h1 class="title">
                            Próximamente
                        </h1>
                        <h2 class="subtitle">
                            Ideas que mejorarán tu vida
                        </h2>
                    </div>
                </div>
                <div class="hero-foot mb-3">
                    <div class="container has-text-centered">
                        <p>Apoyanos compartiendo para motivarnos a seguir desarrollando este proyecto 👻</p>
                    </div>
                </div>
            </section>
        )
    },
    {
        text: 'Editor',
        path: '/editor',
        component: EditorPage,
        navbarVisible: false
    },
    {
        text: 'Instructivo para quemar cocinas',
        path: '/',
        component: HomePage,
        navbarVisible: false
    }
  ]