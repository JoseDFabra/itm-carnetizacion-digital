import { HttpClient} from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError  } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { AuthStatus } from '../enums/auth-status.enum';
import { User } from '@shared/interfaces/user.interface';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly baseUrl: string = environment.baseUrl;
    private  http = inject(HttpClient);
    private _currentUser = signal< Omit<User, 'password' | 'id'  > | null>(null);
    // private _authStatus = signal<AuthStatus>(AuthStatus.checking);
    public currentUser = computed(() => this._currentUser());
    // public authStatus = computed(() => this._authStatus());

    public login(id: string, myPassword: string): Observable<boolean> {
        const url = `${this.baseUrl}/users`;
        return this.http.get<User>(`${url}/${id}`)
        .pipe(
            map(response =>{
                if( response && response.password !== myPassword ) return false
                const {password, id, ...user} = response
                this._currentUser.set(user);
                return true;
            }),
            tap(() => this.setLocalStorage()),
            catchError((err) => of( false ) )   
        )
    }
    constructor(){ this.loadLocalStorage() }
    public loadLocalStorage(){
        const user = localStorage.getItem('currentUser');
        if(!user) return;
        this._currentUser.set(JSON.parse(user));
        
    }

    public setLocalStorage(){
        localStorage.setItem('currentUser', JSON.stringify(this._currentUser()));
    }

    public deleteLocalStorage(){
        localStorage.removeItem('currentUser');
        this._currentUser.set(null);
    }

    public logout(): void {
        this.deleteLocalStorage();
    }

    public register( user: any ): Observable<User> {
        const url = `${this.baseUrl}/users`;
        return this.http.post<User>(`${ url }`, user ).pipe(tap(console.log));
      }



    
}