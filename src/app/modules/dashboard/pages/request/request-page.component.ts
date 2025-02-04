import { CommonModule } from '@angular/common';
import { Component,  computed,  effect,  HostListener,  inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Solicitud } from '@modules/dashboard/interfaces/solicitud.interface';
import { DashboardService } from '@modules/dashboard/services/dahsboard.service';
import { SolicitudesService } from '@modules/dashboard/services/solicitudes.service';
import { Estado } from '@shared/enums/estado.enum';
import { Subject, takeUntil, tap } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'dashboard-request',
  templateUrl: 'request-page.component.html',
  styleUrls: ['./request-page.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})

export default class RequestPageComponent implements OnInit, OnDestroy {
  private solicitudesService = inject( SolicitudesService );
  private fb = inject(FormBuilder);
  public observacion = this.fb.control('', [Validators.required]);
  public solicitudActual = signal<Solicitud | null>( null );
  private rechazados = signal<Solicitud[]>( [] );
  private aprobados = signal<Solicitud[]>( [] );
  private pendientes = signal<Solicitud[]>( [] );
  private solicitudesFiltradas = signal<Solicitud[]>( [] );
  public solicitudes = computed<Solicitud[] | null>( ()=> this.solicitudesFiltradas() );
  private destroy$ = new Subject<void>();
  public modal = signal<{isModalOpen:boolean, modalImage:string | null}>({ isModalOpen: false, modalImage: null })
  private filterMap: { [key: string]: () => Solicitud[] } = {
    pendiente: () => this.pendientes(),
    aprobado: () => this.aprobados(),
    rechazado: () => this.rechazados(),
    all: () => [...this.pendientes(), ...this.aprobados(), ...this.rechazados()]
  };
  public page = 1
  


  public ngOnInit(): void {
    this.solicitudesService.getSolicitudes(20)
    .pipe(takeUntil(this.destroy$), tap(d => console.log(d.length)))
    .subscribe({
      next: (data) => {
          this.rechazados.set( data.filter( soli => soli.estado === Estado.rechazado));
          this.aprobados.set( data.filter( soli => soli.estado === Estado.aprobado));
          this.pendientes.set( data.filter( soli => soli.estado === Estado.pendiente));
          this.solicitudesFiltradas.update(() => [...this.pendientes(), ...this.aprobados(), ...this.rechazados()])
          this.solicitudActual.set( this.pendientes()[0] ?? [] )

      },
      error: (err) => {
          console.error('Error fetching requests', err);
      }
  });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onAceptar( ):void{
    Swal.fire({
      title: "¿Aceptar solicitud de carnetización?",
      showDenyButton: true,
      confirmButtonText: "Sí, aceptar solicitud",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudesService.updateSolicitud( {estado: Estado.aprobado, observacion: this.observacion.value!}, this.solicitudActual()!.documento)
        .subscribe(
          {
            next: (data) => {
              console.log(data)
              if( this.solicitudActual()!.estado === Estado.pendiente){
                this.pendientes.update((p) => p.filter(r => r.id !== this.solicitudActual()!.id))
              }
              else{
                this.rechazados.update((d) => d.filter(r => r.id !== this.solicitudActual()!.id))
              }
              this.aprobados.update((a) => [...a, {...this.solicitudActual()!, estado: Estado.aprobado}])
              this.updateSolicitudesFiltradas();
              this.updateSolicitudActual('Aceptado!');
            },
            error: (err) => {
              console.error('Error updating request', err);
              Swal.fire("Hubo un error al rechazar la solicitud", "", "error");
            }
          }
        )

      } 

      if( this.modal().isModalOpen ) this.closeModal()
    });


    
  }

  private updateSolicitudActual(message: string){
    this.observacion.reset()
    if(this.pendientes().length > 0){
      this.solicitudActual.set(this.pendientes()[0])
      Swal.fire(message, "", "success");
      return;
    }
    this.solicitudActual.set(null)
    Swal.fire(message, "", "success");
    
  }

  public onRechazar(): void {
    if(this.observacion.invalid){
      Swal.fire("Ingresa un motivo para rechazar la solicitud", "", "error");
      return;
    }
    if(!this.solicitudActual()) return;
    Swal.fire({
      title: "¿Rechazar solicitud de carnetización?",
      showDenyButton: true,
      confirmButtonText: "Sí, rechazar solicitud",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudesService.updateSolicitud( {estado: Estado.rechazado, observacion: this.observacion.value!}, this.solicitudActual()!.documento)
        .subscribe(
          {
            next: (data) => {
              this.pendientes.update((p) => p.filter(r => r.id !== this.solicitudActual()!.id))
              this.rechazados.update((a) => [...a, {...this.solicitudActual()!, state: 'rechazados'}])
              this.updateSolicitudesFiltradas();
              this.updateSolicitudActual('Rechazado!');
            },
            error: (err) => {
              console.error('Error updating request', err);
              Swal.fire("Hubo un error al intentar rechazar la solicitud", "", "error");
            }
          }
        )
      } 
    });
  }

  public openModal(imageUrl: string | null): void {
    if (imageUrl) {
      this.modal.set({isModalOpen:true, modalImage: imageUrl})

    }
  }

  public closeModal(): void {
    this.modal.set({isModalOpen:false, modalImage: null})
  }

  @HostListener('document:keydown.escape', ['$event'])
  public handleEscapeKey(event: KeyboardEvent): void {
    this.closeModal();
  }

  public onFilterchange(e: Event){
    const target = e.target as HTMLInputElement;  
    this.solicitudesFiltradas.update(this.filterMap[target.value] || this.filterMap['all']);
  }

  private updateSolicitudesFiltradas(){
    this.solicitudesFiltradas.update(() => [...this.pendientes(),...this.aprobados(),...this.rechazados()])
  }
  
  setSolicitudActual(soli: Solicitud){
    this.solicitudActual.set(soli)
    this.observacion.setValue( soli.observacion )
  }



  modalData = {
    isModalOpen: true,
    archivos: [
      { nombre: 'Foto', tipo: 'Imagen', url: 'https://example.com/imagen.jpg' },
      { nombre: 'Acta de inicio', tipo: 'Imagen', url: 'https://example.com/imagen.jpg' },
      { nombre: 'Acta de grado', tipo: 'Imagen', url: 'https://example.com/imagen.jpg' },
    ],
  }

  verArchivo(archivo: { url: string; tipo: string }) {
    window.open(archivo.url, '_blank');
  }

  descargarArchivo(archivo: { url: string; nombre: string }) {
    const link = document.createElement('a');
    link.href = archivo.url;
    link.download = archivo.nombre;
    link.click();
  }

}