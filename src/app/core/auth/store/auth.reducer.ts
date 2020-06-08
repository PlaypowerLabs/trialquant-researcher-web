import { AuthState } from './auth.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: false,
  user: null,
  error: null,
};

const reducer = createReducer(
  initialState,
  on(
    AuthActions.actionLoginStart,
    (state) => ({ ...state, isAuthenticating: true })
  ),
  on(
    AuthActions.actionLoginSuccess,
    (state, { payload: { user } }) => ({
      ...state,
      user,
      isAuthenticating: false,
      isAuthenticated: true,
    }))
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}
