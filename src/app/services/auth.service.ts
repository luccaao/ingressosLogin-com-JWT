import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Usuario } from '../usuario.model';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './user.service';
import { UsuarioRegistro } from '../usuarioRegistro.model';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

interface AuthResponse {
  jwt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:1337/api/auth/local';
  private APIres = 'http://localhost:1337/api/auth/local/register';
  private APIget = 'http://localhost:1337/api/users/';
  private APIingressos = 'http://localhost:1337/api/ingressos';


    matSnackBar = inject(MatSnackBar);

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  autenticado = new BehaviorSubject<boolean>(false);

  autenticar(usuario: Usuario): Observable<HttpResponse<AuthResponse>> {
    return this.httpClient
      .post<AuthResponse>(this.API, usuario, {
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          const authToken = response.body?.jwt || '';
          this.userService.salvaToken(authToken);
          this.autenticado.next(true);
          this.router.navigate(['/home']);
          window.location.reload();
          window.location.href = 'http://localhost:4200/home';
        })
      );
  }

  simulateLoading(time: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  autenticadoUser() {
    return this.autenticado.value;
  }

  registrar(event: UsuarioRegistro) {
    return this.httpClient.post(this.APIres, event);
  }

  getUsuario(id: string) {
    return this.httpClient.get<Usuario>(`${this.APIget}${id}`);
  }

  getRelacao(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.APIget}${id}?populate=ingressos`);
  }

  removarRelacao(id: string, disconnect_body: any) {
    console.log(disconnect_body)
    this.httpClient.put(`${this.APIingressos}/${id}`, disconnect_body).subscribe({
      next: (res) => {
        console.log(res)
        this.simulateLoading(3000)
        window.location.reload()
      }})

    
  }

  async reservarIngresso(id: string, connect_body: any) {
    this.httpClient.put(`${this.APIingressos}/${id}`, connect_body).subscribe({
      next: (res) => {
        this.matSnackBar.open('Ingresso reservado com sucesso!', 'Fechar', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'custom-snackbar'
        });
      }
    });
  }

}
