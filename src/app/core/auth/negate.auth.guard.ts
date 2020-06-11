import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from '../core.state';
import { selectUserInfo } from './store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class NegateAuthGuard implements CanActivate {
  constructor(
    private store$: Store<AppState>,
    private router: Router
  ) {}

  canActivate(_: ActivatedRouteSnapshot): Observable<boolean> {
    return combineLatest(
      this.store$.pipe(select(selectUserInfo))
    ).pipe(
      map(([userDoc]) => {
        if (userDoc) {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
