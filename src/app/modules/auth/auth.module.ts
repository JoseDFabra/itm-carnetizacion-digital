import { NgModule } from '@angular/core';
import { AuthRoutes } from './auth.routes';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import LoginComponent from './views/login/login.component';
import RegisterComponent from './views/register/register.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [ SharedModule, RouterModule, CommonModule, ReactiveFormsModule ],
    exports: [ AuthRoutes ],
    declarations: [ LoginComponent, RegisterComponent ],
    providers: [],
})
export class AuthModule { }
