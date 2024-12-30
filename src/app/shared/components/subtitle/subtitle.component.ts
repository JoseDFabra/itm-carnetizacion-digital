import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'subtitle',
    standalone:true,
    template: `
    <p class="text-base font-normal text-gray-300 lg:text-lg sm:px-8">
        <ng-content/>
    </p>
    `
})

export class SubtitleComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}