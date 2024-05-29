import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class IngressosService {
  private API = 'http://localhost:1337/api/ingressos';


  ingressoReserva! : {
    id: string;
    attributes: {
      nome: string;
      preco: number;
      data: string;
      local: string;
    };
  }

  constructor(private httpClient: HttpClient) {}

  getIngressos(): Observable<any> {
    return this.httpClient.get<any>(this.API);
  }

  getIngresso(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API}/${id}`);
  }


  reservarIngresso(
    id: string,
    ingressoReserva: {
      id: string;
      attributes: { nome: string; preco: number; data: string; local: string };
    }
  ) {
    return this.httpClient.post<any>(`${this.API}/${id}`, { ingressoReserva }).subscribe({
      next: (res) => {
        console.log(res);
      },
    })
  }
}
