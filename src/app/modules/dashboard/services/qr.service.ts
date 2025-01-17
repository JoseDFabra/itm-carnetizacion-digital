import { computed, Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class QRService {
    public data = signal<Object | null >( null )
    constructor() {
        this.data.set( JSON.parse( localStorage.getItem('qrData') || '{}' ) ) 
     }


    public generate(data:Object){
        if(!data) return
        this.saveLocalData(data);
    }

    public getData(){
        if(!localStorage.getItem('qrData' )) return
        return localStorage.getItem('qrData') || '{}'
    }

    public clean(){
        localStorage.removeItem('qrData')
        this.data.set( null ) 
    }

    public saveLocalData(data:Object){
        this.data.set( data )  // Emit the new data
        localStorage.setItem('qrData', JSON.stringify( data ) )
    }    
}