import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from '@modules/auth/guards/isAuthenticated.guard';
import { isNotAuthenticatedGuard } from '@modules/auth/guards/isNotAuthenticated.guard';


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
        canActivate: [ isNotAuthenticatedGuard ]
      },
      {
        path:'request',
        loadChildren: () => import('@modules/request/request.routes').then(m => m.routes)
      }
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@modules/dashboard/dashboard.routes').then(m=> m.routes),
    canActivate: [ isAuthenticatedGuard ]
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
