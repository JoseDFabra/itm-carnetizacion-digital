import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'auth'
  },
  {
    path: '',
    loadComponent: () => import('@shared/layouts/public-layout/public-layout.component'),
    children: [
      {
        path:'auth',
        loadChildren: () => import('@modules/auth/auth.routes').then(m => m.routes),
      },
      {
        path:'request',
        loadChildren: () => import('@modules/request/request.routes').then(m => m.routes)
      }
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@modules/dashboard/dashboard.routes').then(m=> m.routes)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo:'auth'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }
