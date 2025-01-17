import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QRService } from '@modules/dashboard/services/qr.service';

@Component({
    selector: 'generate-qr',
    templateUrl: 'generate-qr-page.component.html',
    standalone: true,
    imports: [ ReactiveFormsModule ] 
})

export default class GenerateQRPageComponent implements OnInit {
    private fb = inject( FormBuilder )
    private route = inject( Router);
    private QRService = inject( QRService )
    public today = new Date().toISOString().split('T')[0]
    public  form = this.fb.group({
        startDate: [new Date().toISOString().split('T')[0], [] ],
        endDate: [new Date().toISOString().split('T')[0], [] ],
        profile: ['asd', [] ],
        info: ['asd', [] ],
    })
    constructor() { }

    ngOnInit() { }

    public generateQR(){
        this.QRService.generate( this.form.value );
        this.route.navigateByUrl('/dashboard/qr');
    }
}