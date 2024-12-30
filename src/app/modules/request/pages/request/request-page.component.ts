import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FACULTADES } from '@shared/constants/facultades-list.const';
import { IDTYPES } from '@shared/constants/idTypes.const';
import { MOTIVOS } from '@shared/constants/motivos-list.const';
import { PERFILES } from '@shared/constants/perfil-list.const';
import { RHLIST } from '@shared/constants/rh-list.const';
import { SharedModule } from '@shared/shared.module';

@Component({
    selector: 'request-request',
    standalone: true,
    imports: [CommonModule, SharedModule],
    templateUrl: 'request-page.component.html',
    host: {
        //atributos que emplea el componente en si (app-register) en html
        class: 'w-full max-w-4xl p-6 flex flex-col  '
      }
})

export default class NameComponent implements OnInit {
    public idTypes = IDTYPES
    public facultades = FACULTADES
    public perfiles = PERFILES
    public motivos = MOTIVOS
    public rhlist = RHLIST
    constructor() { }

    ngOnInit() { }

}