import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, State } from './auth.model';

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');

export const selectIsAuthenticating = createSelector(
  selectAuthState,
  state => state && state.isAuthenticating
);

export const selectUserInfo = createSelector(
  selectAuthState,
  state => state && state.userInfo
);

export const selectUserId = createSelector(
  selectUserInfo,
  userInfo => userInfo && userInfo.uid
);
