import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '../core.state';
import { Store, select } from '@ngrx/store';
import { AuthService } from './auth.service';
import { selectUserInfo } from './store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest(
      this.store$.pipe(select(selectUserInfo)),
    ).pipe(
      map(([userInfo]) => {
        if (userInfo) {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      })
    );
  }
}
