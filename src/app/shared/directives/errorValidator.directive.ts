import { Directive, ElementRef, Input, OnInit, signal } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[errorValidator]'
})
export class ValidatorErrorDirective implements OnInit {
  private _isTouched = signal<boolean | undefined>( false )
  private htmlElement?: ElementRef<HTMLElement>;
  private _errors?: ValidationErrors | null;

  @Input() set errors( value: ValidationErrors | null | undefined ) {
    this._errors = value;
    this.setErrorMessage();
  }
  @Input() set isTouched( value: boolean | undefined) {
    this._isTouched.set(value)
    this.setErrorMessage();
  }


  constructor( private el: ElementRef<HTMLElement> ) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setStyle();
  }


  setStyle():void {
    if ( !this.htmlElement )return;
    this.htmlElement!.nativeElement.setAttribute('class', 'font-medium text-red-500 text-base mt-2')
  }

  setErrorMessage():void {
    if ( !this.htmlElement) return;
    if ( !this._errors ) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }
    if( !this._isTouched() ) return;
    
    const errors = Object.keys(this._errors);
    if ( errors.includes('required') )  {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido.';
      return;
    }

    if ( errors.includes('minlength') )  {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];

      this.htmlElement.nativeElement.innerText = `Mínimo ${current}/${ min } caracteres.`;
      return;
    }

    if ( errors.includes('email') )  {
      this.htmlElement.nativeElement.innerText = 'No tiene formato de correo.';
      return;
    }
    if ( errors.includes('notEqual') )  {
      this.htmlElement.nativeElement.innerText = 'La contraseña no coincide.';
      return;
    }



  }


}
