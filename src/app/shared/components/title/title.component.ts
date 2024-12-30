import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'title',
    standalone: true,
    template: `
    <h1 class="text-lg font-bold leading-none tracking-tight text-white md:text-lg lg:text-xl ">
    <ng-content></ng-content>
    </h1>
    `
})

export class TitleComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}