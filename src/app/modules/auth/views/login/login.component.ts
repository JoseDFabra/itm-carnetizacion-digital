import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    //atributos que emplea el componente en si (app-login) en html
    class: 'w-full gap-10 max-w-2xl p-6 text-white rounded-lg '
  }
})
export default class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject( Router );
  private authService = inject(AuthService);
  public form = this.fb.group({
    id: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })


  public onSumit() {
    const { password, id } = this.form.value
    this.authService.login(id!, password!).subscribe(authenticated => {
      if (!authenticated) {
        Swal.fire({
          title: 'Error',
          text: 'Identificacion o contraseña   incorrecto',
          icon: 'error',
        })
        return;
      }
      Swal.fire('Correcto', 'Has iniciado sesión correctamente','success')

    }
    )
  }

}
