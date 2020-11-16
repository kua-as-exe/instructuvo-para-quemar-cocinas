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
        component: ()=>(<h1>Tips</h1>)
    },
    {
        text: 'Editor',
        path: '/editor',
        component: EditorPage,
        navbarVisible: true
    },
    {
        text: 'Instructivo para quemar cocinas',
        path: '/',
        component: HomePage,
        navbarVisible: false
    }
  ]