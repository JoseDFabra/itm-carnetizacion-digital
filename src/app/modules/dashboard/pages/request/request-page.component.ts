import { CommonModule } from '@angular/common';
import { Component,  computed,  effect,  HostListener,  inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Request } from '@modules/dashboard/interfaces/request.interface';
import { DashboardService } from '@modules/dashboard/services/dahsboard.service';
import { RequestsService } from '@modules/dashboard/services/requests.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'dashboard-request',
  templateUrl: 'request-page.component.html',
  styleUrls: ['./request-page.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})

export default class RequestPageComponent implements OnInit, OnDestroy {
  private requestsService = inject( RequestsService );
  private fb = inject(FormBuilder);
  public observation = this.fb.control('', [Validators.required])
  public currentRequest = signal<Request | null>( null )
  private rejected = signal<Request[]>( [] )
  private approved = signal<Request[]>( [] )
  private pending = signal<Request[]>( [] )
  private filteredRequests = signal<Request[]>( [] )
  public requests = computed<Request[] | null>( ()=> this.filteredRequests() )
  private destroy$ = new Subject<void>();
  public modal = signal<{isModalOpen:boolean, modalImage:string | null}>({ isModalOpen: false, modalImage: null })
  private filterMap: { [key: string]: () => Request[] } = {
    pending: () => this.pending(),
    approved: () => this.approved(),
    rejected: () => this.rejected(),
    all: () => [...this.pending(), ...this.approved(), ...this.rejected()]
  };
  public page = 1
  


  public ngOnInit(): void {
    this.requestsService.getAllRequests()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
          this.rejected.set( data.filter( request => request.state === 'rejected'));
          this.approved.set( data.filter( request => request.state === 'approved'));
          this.pending.set( data.filter( request => request.state === 'pending'));
          this.filteredRequests.update(() => [...this.pending(), ...this.approved(), ...this.rejected()])
          this.currentRequest.set( this.pending()[0] ?? [] )

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
        if( this.currentRequest()!.state === 'pending'){
          this.pending.update((p) => p.filter(r => r.id !== this.currentRequest()!.id))
        }
        else{
          this.rejected.update((d) => d.filter(r => r.id !== this.currentRequest()!.id))
        }
        this.approved.update((a) => [...a, {...this.currentRequest()!, state: 'approved'}])
        this.updateFilteredRequests();
        this.updateCurrentRequest('Aceptado!');

      } 

      if( this.modal().isModalOpen ) this.closeModal()
    });


    
  }

  private updateCurrentRequest(message: string){
    this.observation.reset()
    if(this.pending().length > 0){
      this.currentRequest.set(this.pending()[0])
      Swal.fire(message, "", "success");
      return;
    }
    this.currentRequest.set(null)
    Swal.fire(message, "", "success");
    
  }

  public onRechazar(): void {
    if(this.observation.invalid){
      Swal.fire("Ingresa un motivo para rechazar la solicitud", "", "error");
      return;
    }
    if(!this.currentRequest()) return;
    Swal.fire({
      title: "¿Rechazar solicitud de carnetización?",
      showDenyButton: true,
      confirmButtonText: "Sí, rechazar solicitud",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.pending.update((p) => p.filter(r => r.id !== this.currentRequest()!.id))
        this.rejected.update((a) => [...a, {...this.currentRequest()!, state: 'rejected'}])
        this.updateFilteredRequests();
        this.updateCurrentRequest('Rechazado!');
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
    this.filteredRequests.update(this.filterMap[target.value] || this.filterMap['all']);
  }

  private updateFilteredRequests(){
    this.filteredRequests.update(() => [...this.pending(),...this.approved(),...this.rejected()])
  }
  
  setCurrentRequest(request: Request){
    this.currentRequest.set(request)
    this.observation.setValue( request.observation )
  }



  modalData = {
    isModalOpen: true,
    archivos: [
      { nombre: 'Foto', tipo: 'Imagen', url: 'https://example.com/imagen.jpg' },
      { nombre: 'Acta de inicio', tipo: 'Imagen', url: 'https://example.com/imagen.jpg' },
      { nombre: 'Acta de grado', tipo: 'Imagen', url: 'https://example.com/imagen.jpg' },
      { nombre: 'Comprobante de pago', tipo: 'PDF', url: 'https://example.com/comprobante.pdf' },
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