import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@Component({
    templateUrl: 'forgot-password.component.html',
    standalone: true,
    imports:[ ReactiveFormsModule, SharedModule, RouterModule ],
    host: {
        //atributos que emplea el componente en si (app-login) en html
        class: 'w-full max-w-3xl p-6 '
      }
})

export default class ForgotPasswordPage implements OnInit {
    public fb = inject( FormBuilder )
    public forgotPasswordForm = this.fb.group({
        email: ['', [Validators.required,Validators.email] ]  // add validators for email format and uniqueness in database here
    })
    constructor() { }

    ngOnInit() { }

    public onSubmit() {
        console.log(this.forgotPasswordForm.value)
    }
}