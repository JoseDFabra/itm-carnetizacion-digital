import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FACULTADES } from '@shared/constants/facultades-list.const';
import { IDTYPES } from '@shared/constants/idTypes.const';
import { MOTIVOS } from '@shared/constants/motivos-list.const';
import { PERFILES } from '@shared/constants/perfil-list.const';
import { RHLIST } from '@shared/constants/rh-list.const';
import { SharedModule } from '@shared/shared.module';

@Component({
    selector: 'request-request',
    standalone: true,
    imports: [CommonModule, SharedModule, ReactiveFormsModule],
    templateUrl: 'request-page.component.html',
    host: {
        class: 'w-full max-w-4xl p-6 flex flex-col  '
      }
})

export default class NameComponent implements OnInit {
    public idTypes = IDTYPES
    public facultades = FACULTADES
    public perfiles = PERFILES
    public motivos = MOTIVOS
    public rhlist = RHLIST
    public fb = inject( FormBuilder );
    public form = this.fb.group({
        idType: ['', [Validators.required]],
        id: ['', [Validators.required]],
        profile: ['', [Validators.required]],
        reason: ['', [Validators.required]],
        carnet: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        fullName: ['', [Validators.required, Validators.minLength(5)]],
        rh: ['', [Validators.required]],
        facultad: ['', [Validators.required]],
        reclaim: ['', [Validators.required]],
        // phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
        // observations: ['', [Validators.required, Validators.minLength(50)]],
    })
    constructor() { }

    ngOnInit() { }

}