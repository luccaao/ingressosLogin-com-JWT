import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../usuario.model';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './user.service';
import { UsuarioRegistro } from '../usuarioRegistro.model';

interface AuthResponse {
  jwt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:1337/api/auth/local';
  private APIres = 'http://localhost:1337/api/auth/local/register';
  private APIget = "http://localhost:1337/api/users/"


  constructor(private httpClient: HttpClient, private userService: UserService) {}

  

  autenticar(usuario: Usuario): Observable<HttpResponse<AuthResponse>> {
    return this.httpClient.post<AuthResponse>(this.API, usuario, {
      observe: 'response',
    }).pipe(
      tap((response) => {
        const authToken = response.body?.jwt || "";
        this.userService.salvaToken(authToken);
      })
    )
  }


  registrar(event: UsuarioRegistro) {
    return this.httpClient.post(this.APIres, event);

  }

  getUsuario(id: string) {
    return this.httpClient.get<Usuario>(`${this.APIget}${id}`);
  }
  
}
