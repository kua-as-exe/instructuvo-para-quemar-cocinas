// import React from 'react';

import HomePage from './pages/HomePage/HomePage';
import DishesPage from './pages/DishesPage/DishesPage';
// import DishPage from './pages/DishPage/DishPage';
import EditorPage from './pages/EditorPage/EditorPage';

import TipsPage from './pages/TipsPage/TipsPage';

export const routes = [
    {
        text: 'Recetas XD',
        path: '/recetas',
        component: DishesPage,
        navbarVisible: false
    },
    {
        text: 'Recetas',
        path: '/recetas/inicio',
        component: DishesPage,
        navbarVisible: true
    },
    {
        text: 'Tips',
        path: '/tips',
        component: TipsPage
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