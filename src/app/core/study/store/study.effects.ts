import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core.state';
import { Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { StudyDataService } from '../study.data.service';

@Injectable()
export class StudyEffects {
  constructor(
    private studyDataService: StudyDataService,
    private store$: Store<AppState>,
    private actions$: Actions,
    private router: Router
  ) { }

}
