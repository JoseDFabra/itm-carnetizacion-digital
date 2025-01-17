import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-title',
    standalone: true,
    imports:[CommonModule],
    template: `
    <h1 class="text-lg font-bold leading-none tracking-tight text-white md:text-xl lg:text-2xl ">
    <ng-content></ng-content>
    </h1>
    `
})

export class TitleComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}