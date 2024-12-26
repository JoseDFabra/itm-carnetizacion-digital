import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterModule],
    styleUrls: ['./layout-auth.component.scss'],
    templateUrl: 'layout-auth.component.html',
    host: {
        class: 'w-full h-full flex flex-col items-center min-h-screen text-white'
    }
})

export default class LayoutAuthComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}