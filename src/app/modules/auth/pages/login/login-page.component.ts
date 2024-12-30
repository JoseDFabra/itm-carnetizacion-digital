import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { TitleComponent } from '@shared/components/title/title.component';
import { OnlyNumbersDirective } from '@shared/directives/onlyNumbers.directive';
import { SharedModule } from '@shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, RouterModule  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    //atributos que emplea el componente en si (app-login) en html
    class: 'w-full max-w-lg p-6 '
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
      this.router.navigate(['dashboard'])

    }
    )
  }

}
