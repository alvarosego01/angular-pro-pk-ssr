import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'pokemons/page/:page',
        loadComponent: () => import('./pages/pokemonsPage/pokemons-page.component')
    },
    {
        path: 'pokemons/:id',
        loadComponent: () => import('./pages/pokemonPage/pokemonPage.component'),
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/aboutPage/aboutPage.component')
    },
    {
        path: 'pricing',
        loadComponent: () => import('./pages/pricingPage/pricing.component')
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contactPage/contact.component')
    },
    {
        path: '**',
        // también recibe funciones
        redirectTo: 'about'
    }


];
