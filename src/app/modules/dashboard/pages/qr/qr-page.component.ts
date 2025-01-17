import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { QRService } from '@modules/dashboard/services/qr.service';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
    templateUrl: 'qr-page.component.html',
    imports: [ QRCodeModule, CommonModule ],
    standalone: true,
})

export default class QRPageComponent implements OnInit, OnDestroy {
    private QRService = inject(QRService);
    constructor() { }
    ngOnDestroy(): void {
        this.QRService.clean()
    }

    public get qrData(){
        return this.QRService.getData();
    }
    ngOnInit() { }
}