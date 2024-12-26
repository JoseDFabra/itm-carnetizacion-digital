import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
      // Importaciones globales
  ],
})
export class CoreModule {
  // Esto hace que Coremodule actue como un singleton (que solo haya una sola instancia en la aplicacion)
  constructor(
    @Optional()
    @SkipSelf() // 
    parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule ya esta cargado.');
    }
  }
}
