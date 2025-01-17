import { Component, ElementRef, EventEmitter, HostListener, inject, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '@modules/auth/interfaces/user.interface';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
    selector: 'dashboard-navbar',
    templateUrl: 'navbar.component.html',
    standalone:true,
    imports:[ CommonModule, RouterModule ],

})

export class NavbarComponent  {
    public isDropdownVisible = signal<boolean>( false );
    private authService = inject( AuthService )
    private route = inject( Router )
    @ViewChild('dropdown') $dropdown!: ElementRef<HTMLDivElement> 
    @ViewChild('drowpdownToggleBtn') $drowpdownToggleBtn!: ElementRef<HTMLButtonElement> 
    @Input() isSidebarInvisible:boolean = false;
    @Input() user?:Omit<User, 'password' | 'id'>
    @Output() isSidebarInvisibleChange = new EventEmitter<boolean>();

    public updateSidebarVisibility(){
        this.isSidebarInvisibleChange.emit( !this.isSidebarInvisible )
    }


    public logout(): void{
        this.authService.logout();
        this.route.navigateByUrl('/')
    }

    @HostListener('document:click', ['$event'])
    public handleDocumentClick(event:Event){
        const targetElement = event.target as HTMLElement;
        const parentElement = targetElement.offsetParent;
        if(!this.isDropdownVisible() && (targetElement === this.$drowpdownToggleBtn.nativeElement) ) {
            this.isDropdownVisible.set( true)
            return;
        }
        if(parentElement !== this.$dropdown.nativeElement){
            this.isDropdownVisible.set( false )
            return;
        }

    }



}