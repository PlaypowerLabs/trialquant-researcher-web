import { AuthState } from './auth.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { LocalStorageService } from '../../local-storage/local-storage.service';

export const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: false,
  userInfo: null,
  error: null,
};

const reducer = createReducer(
  initialState,
  on(
    AuthActions.SignInStart,
    (state) => ({ ...state, isAuthenticating: true })
  ),
  on(
    AuthActions.SignInSuccess,
    AuthActions.SignUpSuccess,
    (state, { payload: { userInfo } }) => {
      // Add content in localStorage
      const userState = {
        userInfo,
        isAuthenticating: false,
        isAuthenticated: true,
        error: null
      };
      LocalStorageService.setItem('authState', userState);
      return {
        ...state,
        ...userState
      };
    }
  ),
  on(
    AuthActions.LogoutSuccess,
    (_) => {
      LocalStorageService.clear();
      return initialState;
    }
  ),
  on(
    AuthActions.SignInFailure,
    AuthActions.SignUpFailure,
    (state, { payload: { error } }) => {
      return {
        ...state,
        error
      };
    }
  )
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}
