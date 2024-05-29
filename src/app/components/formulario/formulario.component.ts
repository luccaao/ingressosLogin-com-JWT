import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { FormControl, FormGroup, NgModel, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../usuario.model';
import { UsuarioRegistro } from '../../usuarioRegistro.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, MatButtonModule, MatInputModule ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  formUser = new FormGroup ({
    username : new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  @Output() usuarioRegistro = new EventEmitter<UsuarioRegistro>();
  
  enviarDadosRegistro() {
    this.usuarioRegistro.emit(this.formUser.value as UsuarioRegistro);
  }

  

}
 
