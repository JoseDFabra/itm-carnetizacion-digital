import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Request } from '../interfaces/request.interface';
import { RequestsService } from './requests.service';

@Injectable({providedIn: 'root'})
export class DashboardService {
    private http = inject( HttpClient )
    private requestsService = inject( RequestsService );
    public pendings  = signal( 0 )
    private url = environment.baseUrl + '/requests'

    constructor(){
        if(this.pendings() != 0) return
        this.getAllRequests().subscribe( { error: (err) => console.error(err) } )
    }

    public getAllRequests():Observable<Request[]>{
        return this.requestsService.getAllRequests()
        .pipe(
            tap((r) => this.pendings.set( r.length )),
            tap((r) => this.setLocalStorage( r.length )),
            catchError( err=> throwError(()=> err))
        )
    }


    public get getPendings(){
        return this.pendings()
    }


    public setLocalStorage( pendings: number){
        localStorage.setItem('pendingsRequests', pendings.toString() )
    }


    public deleteRequest( id:number ):Observable<Request>{
        return this.http.delete<Request>( `${this.url }/ ${id}` )
        .pipe(
            catchError( err=> throwError(()=> err))
        )  
    }

}