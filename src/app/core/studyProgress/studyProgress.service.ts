import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core.state';
import { selectAllStudyProgress, selectMaximumSessionsCount } from './store/studyProgress.selectors';
import * as StudentProgressActions from './store/studyProgress.actions';

@Injectable()
export class StudyProgressService {
  constructor(
    private store$: Store<AppState>
  ) { }

  allStudiesProgress$ = this.store$.pipe(select(selectAllStudyProgress));
  maximumSessionsCount$ = this.store$.pipe(select(selectMaximumSessionsCount));

  clearStudyProgressState() {
    this.store$.dispatch(StudentProgressActions.ClearStudyProgress());
  }
}
