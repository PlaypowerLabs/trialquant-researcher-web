import { createAction, props } from '@ngrx/store';
import { auth } from 'firebase/app';
import { User } from './auth.model';

export const actionLoginStart = createAction(
	'[Auth] Login Start',
	props<{ payload: { email: string; password: string } }>()
);

export const actionLoginSuccess = createAction('[Auth] Login Success', props<{ payload: { user: User } }>());

export const actionLoginFailure = createAction('[Auth] Login Failure', props<{ payload: { error: any } }>());

export const actionLogoutStart = createAction('[Auth] Logout Start');

export const actionLogoutSuccess = createAction('[Auth] Logout Success');

export const actionLogoutFailure = createAction('[Auth] Logout Failure');

export const actionSetAuthErrors = createAction('[Auth] Set Auth Errors', props<{ payload: { error: any } }>());
