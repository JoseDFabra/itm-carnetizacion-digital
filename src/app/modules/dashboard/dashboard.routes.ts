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
        path: 'generate-qr',
        loadComponent: () => import('@modules/dashboard/pages/generate-qr/generate-qr-page.component')
      },
      {
        path: 'qr',
        loadComponent: () => import('@modules/dashboard/pages/qr/qr-page.component')
      },
      {
        path: 'users',
        loadComponent: () => import('@modules/dashboard/pages/users/users-page.component')
      },
      {
        path: 'new-user',
        loadComponent: () => import('@modules/dashboard/pages/new-user/new-user-page.component')
      },
      {
        path: '**',
        redirectTo: 'requests'
      }
    ]
  }
]

