import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core.state';
import * as AuthActions from './store/auth.actions';
import { selectUserInfo } from './store/auth.selectors';

@Injectable()
export class AuthService {
  constructor(
    private store$: Store<AppState>
  ) { }

  currentUser$ = this.store$.pipe(select(selectUserInfo));

  loginWithEmail(email: string, password: string): void {
    this.store$.dispatch(AuthActions.SignInStart({ payload: { email, password } }));
  }

  signUpWithEmail(name: string, email: string, password: string): void {
    this.store$.dispatch(AuthActions.SignUpStart({ payload: { name, email, password } }));
  }

  logout(): void {
    this.store$.dispatch(AuthActions.LogoutStart());
  }
}
