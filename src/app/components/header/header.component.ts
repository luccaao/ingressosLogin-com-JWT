import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { IngressosService } from '../../services/ingressos.service';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  user$!: any
  autenticado$!: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {

    console.log(this.autenticado$ = this.userService.estaLogado());
     
    
    this.user$ = this.userService.retornarUsuario();

    this.authService.getUsuario(this.user$?.id).subscribe({
      next: (res) => {
        this.user$ = res;
        console.log(this.user$);
      },
    });
    
  }

  logout() {
    this.userService.logout();
    this.autenticado$ = this.userService.estaLogado();
  
  }
}
