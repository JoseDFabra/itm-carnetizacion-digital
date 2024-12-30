import { ChangeDetectionStrategy, Component, HostBinding, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'dashboard-sidebar',
    templateUrl: 'sidebar.component.html',
    standalone: true,
    imports: [RouterModule],
})

export class SidebarComponent implements OnInit {

    constructor() { }


    ngOnInit() { }
}