import { Component } from '@angular/core';
import { FormularioComponent } from '../../components/formulario/formulario.component';
import { AuthService } from '../../services/auth.service';
import { UsuarioRegistro } from '../../usuarioRegistro.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormularioComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

constructor(private authService: AuthService, private router: Router) { }

  receberUsuario(event: UsuarioRegistro) {
    this.authService.registrar(event).subscribe({
      next: (res) => {
        console.log("registrado com sucesso", res);
        this.router.navigate(['/login']);

      }
      ,
      error: (err) => console.log(err)
    })

  }
 
}
