import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '@modules/dashboard/services/users.service';
import { User } from '@shared/interfaces/user.interface';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],  
    templateUrl: 'new-user-page.component.html'
})

export default class NewUserPageComponent implements OnInit {
        private fb = inject(FormBuilder); 
        public form = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            role: ['', [Validators.required]],
        });
        public roles = ['Superadmin', 'Admin']; 
    
    constructor() { }

    ngOnInit() { 

    }
}