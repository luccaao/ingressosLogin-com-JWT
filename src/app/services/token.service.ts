import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  hasToken() {
    if (localStorage.getItem(KEY)) {
      return true;
    } else {
      return false;
    }
  }

  setToken(token: string) {
    return localStorage.setItem(KEY, token);
  }

  getToken() {
    return localStorage.getItem(KEY);
  }

  removeToken() {
    return localStorage.removeItem(KEY);
  }
}
