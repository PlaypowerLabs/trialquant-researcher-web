import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const APP_KEY = `${environment.appId}-`;

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  static loadAllState() {
    const state = {};
    return state;
  }

  setItem(key: string, value: any) {
    sessionStorage.setItem(`${APP_KEY}${key}`, JSON.stringify(value));
  }

  getItem(key: string) {
    return JSON.parse(sessionStorage.getItem(`${APP_KEY}${key}`));
  }

  removeItem(key: string) {
    sessionStorage.removeItem(`${APP_KEY}${key}`);
  }

  clear() {
    Object.keys(sessionStorage).forEach(key => {
      if (key.includes(APP_KEY)) {
        sessionStorage.removeItem(key);
      }
    });
  }
}
