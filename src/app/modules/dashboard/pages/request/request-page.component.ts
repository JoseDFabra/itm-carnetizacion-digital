import { CommonModule } from '@angular/common';
import { Component,  computed,  HostListener,  inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, } from '@angular/forms';
import { Request } from '@modules/dashboard/interfaces/request.interface';
import { DashboardService } from '@modules/dashboard/services/dahsboard.service';
import { RequestsService } from '@modules/dashboard/services/requests.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'dashboard-request',
  templateUrl: 'request-page.component.html',
  styleUrls: ['./request-page.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})

export default class RequestPageComponent implements OnInit {
  private requestsService = inject( RequestsService );
  private fb = inject(FormBuilder);
  public observation = this.fb.control('')
  public currentRequest = signal<Request | null>( null )
  private denied = signal<Request[]>( [] )
  private approved = signal<Request[]>( [] )
  private pending = signal<Request[]>( [] )
  public requests = computed<Request[] | null>( ()=> [...this.pending(), ...this.denied(), ...this.approved() ] )
  public isModalOpen = false;
  public modalImage: string | null = null;


  public ngOnInit(): void {
    this.requestsService.getAllRequests().subscribe({
      next: (data) => {
          this.denied.set( data.filter( request => request.state === 'rejected'));
          this.approved.set( data.filter( request => request.state === 'approved'));
          this.pending.set( data.filter( request => request.state === 'pending'));
          this.currentRequest.set( this.pending()[0] ?? [] )

      },
      error: (err) => {
          console.error('Error fetching requests', err);
      }
  });
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
          this.denied.update((d) => d.filter(r => r.id !== this.currentRequest()!.id))
        }
        this.approved.update((a) => [...a, {...this.currentRequest()!, state: 'approved'}])
        this.updateCurrentRequest('Aceptado!');

      } 

      if( this.isModalOpen ) this.closeModal()
    });


    
  }

  private updateCurrentRequest(message: string){
    if(this.pending().length > 0){
      this.currentRequest.set(this.pending()[0])
      Swal.fire(message, "", "success");
      return;
    }
    this.currentRequest.set(null)
    Swal.fire(message, "", "success");
  }

  public onRechazar(): void {
    if(this.observation.value?.length === 0){
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
        this.approved.update((a) => [...a, {...this.currentRequest()!, state: 'rejected'}])
        this.updateCurrentRequest('Rechazado!');
      } 
    });
  }

  public openModal(imageUrl: string | null): void {
    if (imageUrl) {
      this.modalImage = imageUrl;
      this.isModalOpen = true;
    }
  }

  public closeModal(): void {
    this.isModalOpen = false;
    this.modalImage = null;
  }

  @HostListener('document:keydown.escape', ['$event'])
  public handleEscapeKey(event: KeyboardEvent): void {
    this.closeModal();
  }

  public onFilterchange(e: Event){
    const target = e.target as HTMLInputElement;
    console.log(target.value)
  }
  

}