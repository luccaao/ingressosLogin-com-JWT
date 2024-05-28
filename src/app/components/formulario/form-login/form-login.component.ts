import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { Usuario } from '../../../usuario.model';


@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {


  formUser = new FormGroup ({
    identifier : new FormControl(''),
    password: new FormControl(''),
  })

  @Output() usuarioLogin = new EventEmitter<Usuario>();
  
  enviarDadosLogin() {
    this.usuarioLogin.emit(this.formUser.value as Usuario);
  }


}
