import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, State } from './auth.model';

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');

export const selectIsAuthenticating = createSelector(
  selectAuthState,
  state => state && state.isAuthenticating
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  state => state && state.isAuthenticated
);

export const selectAuthError = createSelector(
  selectAuthState,
  state => state && state.error
);

export const selectUserInfo = createSelector(
  selectAuthState,
  state => state && state.userInfo
);

export const selectUserId = createSelector(
  selectUserInfo,
  userInfo => userInfo && userInfo.uid
);
