import { Routes } from "@angular/router";


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@modules/dashboard/layout/dashboard-layout.component'),
    children: [
      {
        path: 'requests',
        loadComponent: () => import('@modules/dashboard/pages/request/request-page.component')
      },
      {
        path: '**',
        redirectTo: 'requests'
      }
    ]
  }
]

