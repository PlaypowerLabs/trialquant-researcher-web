import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';

@Injectable()
export class StudyService {
  constructor(
    private store$: Store<AppState>
  ) { }
}
