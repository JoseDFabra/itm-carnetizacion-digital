import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolicitudesService } from '@modules/dashboard/services/solicitudes.service';
import { FACULTADES } from '@shared/constants/facultades-list.const';
import { IDTYPES } from '@shared/constants/idTypes.const';
import { MOTIVOS } from '@shared/constants/motivos-list.const';
import { PERFILES } from '@shared/constants/perfil-list.const';
import { RHLIST } from '@shared/constants/rh-list.const';
import { Estado } from '@shared/enums/estado.enum';
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

export default class RequestPageComponent implements OnInit {
    public idTypes = IDTYPES
    public facultades = FACULTADES
    public perfiles = PERFILES
    public motivos = MOTIVOS
    public rhlist = RHLIST
    private solicitudesService = inject(SolicitudesService);
    public fb = inject(FormBuilder);
    public form!: FormGroup;
    
    public selectedFiles: Record<string, File | null> = {}; 

    constructor() {}

    ngOnInit(): void {
        this.form = this.fb.group({
            tipo_documento: ['CC', Validators.required],
            documento: ['123123', Validators.required],
            nombre: ['Anabel', Validators.required],
            apellido: ['Gonzales Espinoza', Validators.required],
            telefono: ['123123', Validators.required],
            correo_electronico: ['j.fabra25@gmail.com', [Validators.required, Validators.email]],
            tipo_sangre: ['O+', Validators.required],
            carnet: ['12313', Validators.required],
            perfiles: ['estudiante', Validators.required],
            facultad: ['Artes y Humanidades', Validators.required],
            observacion: ['', Validators.required],
            estado: [Estado.pendiente, Validators.required],
            es_activo: [false, Validators.required],
            foto: [null, Validators.required],
            acta_de_grado: [null],
            acta_de_inicio: [null]  
        });
    }
    onFileChange(event: any, fieldName: string): void {
        if (event.target.files.length > 0) {
            this.selectedFiles[fieldName] = event.target.files[0];
        }
    }

    public onSubmit() {


        const formData = new FormData();
        Object.keys(this.form.value).forEach((key) => {
            if (this.form.value[key] !== null && key !== 'foto' && key !== 'acta_de_grado' && key !== 'acta_de_inicio') {
                formData.append(key, this.form.value[key]);
            }
        });

        Object.keys(this.selectedFiles).forEach((key) => {
            if (this.selectedFiles[key]) {
                formData.append(key, this.selectedFiles[key]!);
            }
        });

        this.solicitudesService.addSolicitud(formData).subscribe({
            next: (res) => console.log("Solicitud enviada exitosamente", res),
            error: (err) => console.error("Error al enviar solicitud", err)
        });
    }

}