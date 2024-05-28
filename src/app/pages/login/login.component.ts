import { Component } from '@angular/core';
import { FormularioComponent } from '../../components/formulario/formulario.component';
import { AuthService } from '../../services/auth.service';
import { UsuarioRegistro } from '../../usuarioRegistro.model';
import { Usuario } from '../../usuario.model';
import { FormLoginComponent } from '../../components/formulario/form-login/form-login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormularioComponent, FormLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

 

  receberUsuario(event: Usuario) {
     this.authService.autenticar(event).subscribe({
      next: (res) => {
        console.log("logado com sucesso", res);
        this.router.navigate(['/home']);
      } 
    
      ,
      error: (err) => console.log(err)
     })

    

  }

}
