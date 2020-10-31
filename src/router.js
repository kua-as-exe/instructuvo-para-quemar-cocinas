import React from 'react';

import HomePage from './pages/HomePage/HomePage';
import DishesPage from './pages/DishesPage/DishesPage';

export const routes = [
    {
        text: 'Recetas',
        path: '/recetas',
        component: DishesPage
    },
    {
        text: 'Tips',
        path: '/tips',
        component: ()=>(<h1>Tips</h1>)
    },
    {
        text: 'Instructivo para quemar cocinas',
        path: '/',
        component: HomePage
    }
  ]