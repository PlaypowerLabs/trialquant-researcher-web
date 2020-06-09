import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthDataService } from '../auth.data.service';
import * as AuthActions from './auth.actions';
import { map, filter, switchMap, catchError, tap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { auth } from 'firebase/app';

@Injectable()
export class AuthEffects {
  constructor(
    private authDataService: AuthDataService,
    private store$: Store<AppState>,
    private actions$: Actions,
    private router: Router
  ) { }

  signInStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignInStart),
      map((action) => action.payload),
      filter(({ email, password }) => !!email && !!password),
      switchMap(({ email, password }) => {
        return this.authDataService.checkAuthUserEntryInResearcherCollection(email).pipe(
          switchMap((_) => {
            return this.authDataService.loginWithEmail(email, password).pipe(
              map((data: any) => {
                return AuthActions.SignInSuccess({
                  payload: {
                    userInfo: {
                      name: data.user.displayName,
                      email: data.user.email,
                      emailVerified: data.user.emailVerified,
                      photoUrl: data.user.photoURL,
                      uid: data.user.uid,
                    },
                  },
                });
              }),
              catchError((error: any) => [
                AuthActions.SignInFailure({ payload: { error } })
              ])
            );
          }),
          catchError((error: any) => [
            AuthActions.SignInFailure({ payload: { error } })
          ])
        );
      }),
      catchError((error: any) => [
        AuthActions.SignInFailure({ payload: { error } })
      ])
    )
  );


  signUpStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignUpStart),
      map((action) => action.payload),
      filter(({ name, email, password }) => !!name && !!email && !!password),
      switchMap(({ name, email, password }) =>
        this.authDataService.signUpWithEmail(name, email, password).pipe(
          map((data: any) => {
            return AuthActions.SignUpSuccess({
              payload: {
                userInfo: {
                  name: data.user.displayName,
                  email: data.user.email,
                  emailVerified: data.user.emailVerified,
                  photoUrl: data.user.photoURL,
                  uid: data.user.uid,
                },
              },
            });
          }),
          catchError((err: any) => [
            AuthActions.SignUpFailure({ payload: { error: err.error } })
          ])
        )
      )
    )
  );

  logoutStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LogoutStart),
      switchMap(() =>
        this.authDataService.logout().pipe(
          map(() => AuthActions.LogoutSuccess()),
          catchError((err: any) => [
            AuthActions.SetAuthErrors({ payload: { error: err.error } })
          ])
        )
      )
    )
  );

  navigationOnSignInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignInSuccess, AuthActions.SignUpSuccess),
      tap(() => {
        this.router.navigate(['/dashboard']);
      })
    ),
    { dispatch: false }
  );

  navigationOnLogOutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LogoutSuccess),
      tap(() => {
        this.router.navigate(['/auth']);
      })
    ),
    { dispatch: false }
  );

  // loginStart$ = createEffect(
  //     () => this.actions$.pipe(
  //         ofType(AuthActions.actionLoginStart),
  //         map(action => action.payload),
  //         filter(({ username, password }) => !!username && !!password),
  //         switchMap(({ username, password }) =>
  //             this.authDataService.login(username, password).pipe(
  //                 switchMap((data: User) => {
  //                     this.sessionStorageService.setItem(AUTH_USER, data);
  //                     return [
  //                         AuthActions.actionLoginSuccess({ payload: { user: data } }),
  //                         AuthActions.actionSetAuthErrors({ payload: { error: null } })
  //                     ];
  //                 }),
  //                 catchError((err: any) => [AuthActions.actionLoginFailure({ payload: { error: err.error } })])
  //             )
  //         )
  //     ),
  // );

  // logOutStart$ = createEffect(
  //     () => this.actions$.pipe(
  //         ofType(AuthActions.actionLogoutStart),
  //         map(() => {
  //             this.sessionStorageService.removeItem(AUTH_USER);
  //             this.authService.stopTimerForAccessToken();
  //             return AuthActions.actionLogoutSuccess();
  //         })
  //     ),
  // );

  // generateTokenAtInterval$ = createEffect(
  //     () => this.store$.pipe(
  //         select(selectCurrentUserId),
  //         filter((currentUserId) => !!currentUserId),
  //         switchMap((currentUserId) => {
  //             // TODO: Find better solution for this
  //             const userInfo = this.sessionStorageService.getItem(AUTH_USER);
  //             return this.authDataService.generateToken(userInfo.refresh_token).pipe(
  //                 map(data => {
  //                     this.authService.startTimerForAccessToken();
  //                     this.sessionStorageService.setItem(AUTH_USER, { ...userInfo, ...data });
  //                     return AuthActions.actionGenerateAccessTokenSuccess({ payload: { tokenInfo: data } });
  //                 }),
  //                 catchError(() => [AuthActions.actionGenerateAccessTokenFailure()])
  //             );
  //         })
  //     )
  // );

  // forgotPassword$ = createEffect(
  //     () => this.actions$.pipe(
  //         ofType(AuthActions.actionForgotPasswordStart),
  //         map(action => action.payload),
  //         filter(({ username }) => !!username),
  //         switchMap(({ username }) =>
  //             this.authDataService.forgotPassword(username).pipe(
  //                 switchMap((status) => {
  //                     this._snackBar.openFromComponent(SnackbarComponent, {
  //                         duration: 3000,
  //                         data: {
  //                             message: 'Password reset link has been sent successfully.',
  //                         }
  //                     });
  //                     return [
  //                         AuthActions.actionForgotPasswordSuccess(),
  //                         AuthActions.actionSetAuthErrors({ payload: { error: null } })
  //                     ];
  //                 }),
  //                 catchError((err) => [AuthActions.actionForgotPasswordFailure({ payload: { error: err.error } })])
  //             )
  //         )
  //     )
  // );

  // resetPassword$ = createEffect(
  //     () => this.actions$.pipe(
  //         ofType(AuthActions.actionSetNewPasswordStart),
  //         map(action => action.payload),
  //         withLatestFrom(
  //             this.store$.pipe(select(selectRouterState))
  //         ),
  //         filter(([{ password }, { state: { queryParams } }]) => !!password && !!queryParams.request_token),
  //         switchMap(([{ password }, { state: { queryParams } }]) =>
  //             this.authDataService.resetPassword(password, queryParams.request_token).pipe(
  //                 switchMap((status) => {
  //                     this._snackBar.openFromComponent(SnackbarComponent, {
  //                         duration: 3000,
  //                         data: {
  //                             message: 'Password has been updated.',
  //                         }
  //                     });
  //                     return [
  //                         AuthActions.actionSetNewPasswordSuccess(),
  //                         AuthActions.actionSetAuthErrors({ payload: { error: null } })
  //                     ];
  //                 }),
  //                 catchError((err) => [AuthActions.actionSetNewPasswordFailure({ payload: { error: err.error } })])
  //             )
  //         )
  //     ),
  // );

  // generateAccessToken$ = createEffect(
  //     () => this.actions$.pipe(
  //         ofType(AuthActions.actionGenerateAccessToken),
  //         withLatestFrom(
  //             this.store$.pipe(select(selectCurrentUser))
  //         ),
  //         filter(([, currentUser]) => !!currentUser),
  //         switchMap(([, { refresh_token }]) =>
  //             this.authDataService.generateToken(refresh_token).pipe(
  //                 map(data => {
  //                     const userInfo = this.sessionStorageService.getItem(AUTH_USER);
  //                     this.sessionStorageService.setItem(AUTH_USER, { ...userInfo, ...data });
  //                     return AuthActions.actionGenerateAccessTokenSuccess({ payload: { tokenInfo: data } });
  //                 }),
  //                 catchError(() => [AuthActions.actionGenerateAccessTokenFailure()])
  //             )
  //         )
  //     ),
  // );
}
