import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor() { }

  hasToken() {
    return !!this.getToken();
  }

  setToken(token: string) {
    return localStorage.setItem(KEY , token);
    
  }

  getToken() {
    return localStorage.getItem(KEY);
  }

  removeToken() {
    return localStorage.removeItem(KEY);
  }



}
