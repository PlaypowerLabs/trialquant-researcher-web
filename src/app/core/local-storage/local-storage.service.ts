import { Injectable } from '@angular/core';
import { AuthState } from '../auth/store/auth.model';
import { PreSignUpState } from '../pre-signup/store/pre-signup.model';
import { ChildState } from '../child/store/child.model';

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  constructor() { }

  static loadAllState() {
    if (localStorage.getItem('credentials')) {
      const credentials = JSON.parse(localStorage.getItem('credentials'));
      const skippedLogin = JSON.parse(localStorage.getItem('skippedLogin'));
      const isOnboardingComplete = JSON.parse(localStorage.getItem('isOnboardingComplete'));
      // const selectedChildId = JSON.parse(localStorage.getItem('selectedChildId'));

      const authState: AuthState = {
        isLoggedIn: true,
        isAuthenticating: false,
        currentUser: {
          userId: credentials.uid,
          email: credentials.email,
          name: credentials.name,
          role: credentials.role,
          providerId: credentials.providerId,
          contactNumber: credentials.contactNumber
        },
        isOnboardingComplete,
        token: credentials.token,
        refreshToken: credentials.refreshToken
      };

      const preSignUpState: PreSignUpState = {
        isSyncing: false,
        skippedLogin: skippedLogin ? skippedLogin : false,
        child: null,
        reminder: null
      };

      const childState: Partial<ChildState> = {
        ids: [],
        entities: {},
        // selectedChildId,
        states: {}
      };

      const state = {
        auth: authState, // auth state,
        preSignUp: preSignUpState, // pre-signup state,
        child: childState
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

  clear() {
    Object.keys(localStorage).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}

