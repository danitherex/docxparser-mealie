import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  getTokenFromStorage() {
    return localStorage.getItem('token');
  }

  saveTokenToStorage(token: string) {
    localStorage.setItem('token', token);
  }
}
