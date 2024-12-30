import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: 'form',
        loadComponent: () => import('@modules/request/pages/request/request-page.component'),
        title: 'ITM Solicitud Carnet'
    },
    {
        path: '**',
        redirectTo:'form'
    }
]