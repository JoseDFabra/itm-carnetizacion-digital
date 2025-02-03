import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from '@modules/dashboard/services/users.service';
import { User } from '@shared/interfaces/user.interface';

@Component({
    standalone: true,
    templateUrl: 'users-page.component.html',
    imports: [CommonModule, ReactiveFormsModule, RouterModule]
})

export default class UsersPageComponent implements OnInit {
    public users =  signal<Omit<User, 'password'>[]>( [] )
    private usersService = inject(UsersService);


    constructor() { }
    ngOnInit(): void {
        this.usersService.getUsers()
        .subscribe(
            {
                next: (users) => this.users.set( users ),
                error: (error) => console.error('Error:', error)
            }
        )
    }

}