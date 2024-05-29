import { Component } from '@angular/core';
import { FormularioComponent } from '../../components/formulario/formulario.component';
import { AuthService } from '../../services/auth.service';
import { UsuarioRegistro } from '../../usuarioRegistro.model';
import { Usuario } from '../../usuario.model';
import { FormLoginComponent } from '../../components/formulario/form-login/form-login.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormularioComponent, FormLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router, private userService: UserService ) { }


 

  receberUsuario(event: Usuario) {
     this.authService.autenticar(event).subscribe({
      next: (res) => {
        console.log("logado com sucesso", res);
        this.userService.estaLogado();
      } 
    
      ,
      error: (err) => console.log(err)
     })

    

  }

}
