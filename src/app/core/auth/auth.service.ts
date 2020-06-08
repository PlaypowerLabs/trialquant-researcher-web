import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
  constructor(private store$: Store<AppState>) { }

  loginWithEmail(email: string, password: string): void {
    this.store$.dispatch(AuthActions.actionLoginStart({ payload: { email, password } }));
  }

  logout(): void {
    this.store$.dispatch(AuthActions.actionLogoutStart());
  }
}
