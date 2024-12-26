import { HttpClient} from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap  } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces';
import { AuthStatus } from '../enums/auth-status.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly baseUrl: string = environment.baseUrl;
    private http = inject(HttpClient);
    private _currentUser = signal<User | null>(null);
    private _authStatus = signal<AuthStatus>(AuthStatus.checking);
    public currentUser = computed(() => this._currentUser());
    public authStatus = computed(() => this._authStatus());

    public login(id: string, password: string): Observable<boolean> {
        const url = `${this.baseUrl}/users`;
        return this.http.get<User>(`${url}/${id}`)
        .pipe(
            map(response =>{
                if( response && response.password !== password ) return false
                this._currentUser.set(response);
                return true;
            })
        )
    }
    register( user: any ): Observable<User> {
        const url = `${this.baseUrl}/users`;
        return this.http.post<User>(`${ url }`, user ).pipe(tap(console.log));
      }



    
}