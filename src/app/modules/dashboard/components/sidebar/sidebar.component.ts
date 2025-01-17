import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardService } from '@modules/dashboard/services/dahsboard.service';


@Component({
    selector: 'dashboard-sidebar',
    templateUrl: 'sidebar.component.html',
    standalone: true,
    imports: [RouterModule, CommonModule],
})

export class SidebarComponent implements OnInit {
    private dashboardService = inject( DashboardService )
    constructor() { }


    public get pendingsRequests(){
        return this.dashboardService.getPendings
    }

    ngOnInit() { }
}