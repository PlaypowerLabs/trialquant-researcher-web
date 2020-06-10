import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core.state';
import { selectAllStudy } from './store/study.selectors';
import * as StudyActions from './store/study.actions';

@Injectable()
export class StudyService {
  constructor(
    private store$: Store<AppState>
  ) { }

  allStudies$ = this.store$.pipe(select(selectAllStudy));

  setSelectedStudyId(studyId) {
    this.store$.dispatch(StudyActions.SetSelectedStudyId({ payload: { studyId } }));
  }
}
