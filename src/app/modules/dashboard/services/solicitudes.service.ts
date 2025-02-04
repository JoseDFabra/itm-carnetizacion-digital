import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Solicitud } from '../interfaces/solicitud.interface';
import { Estado } from '@shared/enums/estado.enum';
export type EstadoSolicitud = {
    observacion:string;
    estado: Estado
}
@Injectable({providedIn: 'root'})
export class SolicitudesService {
    private http = inject( HttpClient )
    private readonly url = environment.baseUrl2 + '/api/users-carnets'
    constructor() { }

    public getSolicitudes( limit?:number, offset?:number, estado?: Estado ): Observable<Solicitud[]>{
        const params = new HttpParams()
        .set('limit', `${limit ? limit : '' }`)
        .set('offset', `${offset ? offset : '' }`)
        .set('estado', `${estado ? estado : '' }`)
        return this.http.get<Solicitud[]>(`${this.url}/get-solicitudes`, { params })
        .pipe(
            catchError(err=> throwError(()=> err)), 
            map(data => {
                return data.map(solicitud => {
                    const f = solicitud.foto
                   return  ({
                   ...solicitud,
                   foto: `${this.url}/file/${solicitud.documento}/${f}`
                })
                }
            )
            })
        )
    }

    public addSolicitud(solicitud:any):Observable<Solicitud>{
        return this.http.post<Solicitud>(`${this.url}/crear-solicitud`, solicitud )
    }
    public updateSolicitud(estado_solicitud: EstadoSolicitud,documento:string):Observable<Solicitud>{
        return this.http.patch<Solicitud>(`${this.url}/update/${documento}`, estado_solicitud )
        .pipe(
            catchError(err=> throwError(()=> err)), )
    }

    // public deleteRequest( id:number ):Observable<Request>{
    //     return this.http.delete<Request>( `${this.url }/ ${id}` )
    //     .pipe(
    //         catchError( err=> throwError(()=> err))
    //     )  
    // }

    // public getAllRequests():Observable<Request[]>{
    //     return this.http.get<Request[]>( this.url )
    //     .pipe(
    //         // tap(() => console.log(this.pendings())),
    //         catchError( err=> throwError(()=> err))
    //     )
    // }



}