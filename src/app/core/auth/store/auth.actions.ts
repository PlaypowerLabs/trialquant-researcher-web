import { createAction, props } from '@ngrx/store';
import { User } from './auth.model';

export const SignUpStart = createAction(
  '[Auth] SignUp Start',
  props<{ payload: { name: string, email: string; password: string } }>()
);

export const SignUpSuccess = createAction(
  '[Auth] SignUp Success',
  props<{ payload: { userInfo: User } }>()
);

export const SignUpFailure = createAction(
  '[Auth] SignUp Failure',
  props<{ payload: { error: any } }>()
);

export const ClearError = createAction(
  '[Auth] Clear Error',
  props<{ payload: { error: any } }>()
);

export const SignInStart = createAction(
  '[Auth] SignIn Start',
  props<{ payload: { email: string; password: string } }>()
);

export const SignInSuccess = createAction(
  '[Auth] SignIn Success',
  props<{ payload: { userInfo: User } }>()
);

export const SignInFailure = createAction(
  '[Auth] SignIn Failure',
  props<{ payload: { error: any } }>()
);

export const LogoutStart = createAction(
  '[Auth] Logout Start'
);

export const LogoutSuccess = createAction(
  '[Auth] Logout Success'
);

export const LogoutFailure = createAction(
  '[Auth] Logout Failure'
);

export const SetAuthErrors = createAction(
  '[Auth] Set Auth Errors',
  props<{ payload: { error: any } }>()
);
