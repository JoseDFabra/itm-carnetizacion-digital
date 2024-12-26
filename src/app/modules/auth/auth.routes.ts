import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import LoginComponent from "./views/login/login.component";
import RegisterComponent from "./views/register/register.component";
import LayoutAuthComponent from "./layout/layout-auth.component";


const routes: Routes = [
    {
        path:'',
        component: LayoutAuthComponent,
        children: [
          {
            path:'login',
            component: LoginComponent,
            title: 'ITM Ingreso'
          },
          {
            path:'register',
            component: RegisterComponent,
            title: 'ITM Registrarse'
          },
          {
            path:'',
            pathMatch: "full",
            redirectTo: 'login'
          },
          {
            path:'**',
            redirectTo: 'login'
          },
        ]
    }
]


@NgModule(
  {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }
)
export class AuthRoutes{

}