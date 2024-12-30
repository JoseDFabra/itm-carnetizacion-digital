import { Component, ElementRef, EventEmitter, HostListener, inject, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'dashboard-navbar',
    templateUrl: 'navbar.component.html',
    standalone:true,
    imports:[ CommonModule, RouterModule ],

})

export class NavbarComponent  {
    public isDropdownVisible = signal<boolean>( false )
    @ViewChild('dropdown') $dropdown!: ElementRef<HTMLDivElement> 
    @ViewChild('drowpdownToggleBtn') $drowpdownToggleBtn!: ElementRef<HTMLButtonElement> 
    @Input() isSidebarInvisible:boolean = false;
    @Output() isSidebarInvisibleChange = new EventEmitter<boolean>();

    constructor() { }

    public updateSidebarVisibility(){
        this.isSidebarInvisibleChange.emit( !this.isSidebarInvisible )
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