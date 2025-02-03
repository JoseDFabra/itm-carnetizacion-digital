import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@shared/interfaces/user.interface';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({providedIn: 'root'})
export class UsersService {
    private http = inject( HttpClient )
    private readonly baseurl = environment.baseUrl + '/users'
    constructor() { }
    
    public getUsers():Observable<Omit<User, 'password'>[]>{
        return this.http.get<User[]>( this.baseurl )
        .pipe(
            map( (users) => {
                return users.map( ({password, ...user}) => user )  
            }),
            catchError(err => throwError(()=> err))
        )
    }
}