import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, PatternValidator, ValidationErrors, Validators } from '@angular/forms';
import { idTypes } from '@modules/auth/constants/idTypes.const';
import { AuthService } from '@modules/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    //atributos que emplea el componente en si (app-register) en html
    class: 'w-full gap-10 max-w-7xl p-6 text-white rounded-lg flex flex-col justify-center items-center '
  }
})
export default class RegisterComponent {
  public fb = inject(FormBuilder);
  public idTypes = idTypes
  private authService = inject(AuthService);
  public form = this.fb.group({
    idType: ['', [Validators.required]],
    id: ['', [Validators.required]],
    fullName: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  },
    {
      validators: [
        this.isFieldOneEqualFieldTwo('password', 'confirmPassword'),
      ]
    }

  )

  public isFieldOneEqualFieldTwo(field1: string, field2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }

  public onSubmit(){
    console.log(this.form)
    if(this.form.valid){
      console.log('valid')
      const {confirmPassword, ...user} = this.form.value
      this.authService.register(user!).subscribe(user => {
        Swal.fire('Correcto', 'Te has registrado correctamente','success')
      })
      this.form.reset();
      this.form.markAsUntouched();
      this.form.clearValidators();
      this.form.updateValueAndValidity();
    } else {
      console.log('no valid')
      this.form.markAllAsTouched();
    }
  }
}
