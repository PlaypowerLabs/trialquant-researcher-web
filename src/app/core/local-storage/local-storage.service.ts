import { Injectable } from '@angular/core';
import { AuthState } from '../auth/store/auth.model';

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  constructor() { }

  static loadAllState() {
    if (localStorage.getItem('authState')) {
      const localAuthState = JSON.parse(localStorage.getItem('authState'));
      const authState: AuthState = {
        userInfo: localAuthState.userInfo,
        isAuthenticated: localAuthState.isAuthenticated,
        isAuthenticating: false,
        error: null
      };

      const state = {
        auth: authState, // auth state,
      };
      return state;
    } else {
      return null;
    }
  }

  static setItem(key: string, value: any) {
    localStorage.setItem(`${key}`, JSON.stringify(value));
  }

  static getItem(key: string) {
    return localStorage.getItem(key);
  }

  static clear() {
    Object.keys(localStorage).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}

