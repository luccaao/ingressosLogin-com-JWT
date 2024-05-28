import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { IngressosService } from '../../services/ingressos.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule,MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {


  user$!: any;

  


   ingressos! : [{
    id?: number;
    attributes :{
        nome: string;
        preco: number;
        data: string;
        local: string;
   }}]

  

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private ingressoService: IngressosService
  ) {}

  ngOnInit() {
    this.userService.estaLogado();
    this.ingressoService.getIngressos().subscribe({
      next: (res) => {
        this.ingressos = res.data;
        console.log(this.ingressos);
        
  
      },
    });

    this.user$ = this.userService.retornarUsuario();
    

    this.authService.getUsuario(this.user$.id).subscribe({
      next: (res) => {
        this.user$ = res;
      },
    });
  }

  logout() {
    this.userService.logout();
  }
}
