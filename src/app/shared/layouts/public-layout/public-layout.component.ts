import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterModule],
    styleUrls: ['./public-layout.component.scss'],
    templateUrl: 'public-layout.component.html',
    host: {
        class: 'w-full h-full flex flex-col items-center min-h-screen text-white'
    }
})

export default class PublicLayoutComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}