import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Request } from '../interfaces/request.interface';

@Injectable({providedIn: 'root'})
export class RequestsService {
    private http = inject( HttpClient )
    private url = environment.baseUrl + '/requests'
    constructor() { }
    public deleteRequest( id:number ):Observable<Request>{
        return this.http.delete<Request>( `${this.url }/ ${id}` )
        .pipe(
            catchError( err=> throwError(()=> err))
        )  
    }

    public getAllRequests():Observable<Request[]>{
        return this.http.get<Request[]>( this.url )
        .pipe(
            // tap(() => console.log(this.pendings())),
            catchError( err=> throwError(()=> err))
        )
    }

}