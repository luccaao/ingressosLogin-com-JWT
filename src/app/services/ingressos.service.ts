import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngressosService {

  private API = 'http://localhost:1337/api/ingressos';

  constructor(private httpClient: HttpClient) { }

  getIngressos() : Observable<any> {
    return this.httpClient.get<any>(this.API);
  }


}
