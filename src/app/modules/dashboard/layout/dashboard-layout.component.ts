import { Component, OnInit, signal } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'dashboard-layout',
    standalone: true,
    imports: [ NavbarComponent, SidebarComponent, RouterModule, CommonModule ],
    templateUrl: 'dashboard-layout.component.html'
})

export default class DasboardLayoutComponent implements OnInit {
    public isSidebarInvisible: boolean = false;
    constructor() { }

    ngOnInit() { }


}