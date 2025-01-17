import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
    selector: 'dashboard-layout',
    standalone: true,
    imports: [ NavbarComponent, SidebarComponent, RouterModule, CommonModule ],
    templateUrl: 'dashboard-layout.component.html'
})

export default class DasboardLayoutComponent implements OnInit {
    public isSidebarInvisible: boolean = true;
    private authService = inject( AuthService )
    public  get currentUser(){
        return this.authService.currentUser()
    }
    constructor() { }

    ngOnInit() { }


}