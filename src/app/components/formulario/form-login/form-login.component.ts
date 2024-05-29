import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { Usuario } from '../../../usuario.model';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [MatCardModule ,ReactiveFormsModule,FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
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
