import { Routes } from "@angular/router";


export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@modules/auth/pages/login/login-page.component'),
    title: 'ITM - Ingreso'
  },
  {
    path: 'register',
    loadComponent: () => import('@modules/auth/pages/register/register-page.component'),
    title: 'ITM - Registrarse'
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('@modules/auth/pages/forgot-password/forgot-password.component'),
    title: 'ITM - Olvidaste tu contraseña'
  },
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: 'login'
  },
]



