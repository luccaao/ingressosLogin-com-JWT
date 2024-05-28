import { Injectable } from '@angular/core';
import { Usuario } from '../usuario.model';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private tokenService: TokenService) {  
    if(this.tokenService.hasToken()) {
      this.decodificaJWT();
    }
  }

  private decodificaJWT() {
    const token = this.tokenService.getToken();
    const user = jwtDecode(token!) as Usuario;
    this.userSubject.next(user);
  }

  retornarUsuario() {
    return this.userSubject.value;
  }

  salvaToken(token: string) {
    this.tokenService.setToken(token);
    this.decodificaJWT();
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  
}
