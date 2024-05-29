import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { IngressosService } from '../../services/ingressos.service';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-ingressos',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    RouterLink
    
  ],
  templateUrl: './ingressos.component.html',
  styleUrl: './ingressos.component.css',
})
export class IngressosComponent {
  user$!: any;

  ingressos!: [
    {
      id?: number;

      nome: string;
      preco: number;
      data: string;
      local: string;
    }
  ];
  constructor(
    private ingressosService: IngressosService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if(this.userService.estaLogado() == false){
      window.location.href = '/login';
    }


    this.user$ = this.userService.retornarUsuario();
    this.authService.getRelacao(this.user$.id).subscribe({
      next: (res) => {
        console.log(res.ingressos);

        this.ingressos = res.ingressos;
        console.log('teste' + this.ingressos);
      },
    });
  }

  

  removerIngresso(id: any) {
    
    const disconnect_body = {
      data: {
        users: {
          disconnect: [this.user$.id]
        },
      },
    };
    
    this.authService.removarRelacao(id, disconnect_body);
  }
}
