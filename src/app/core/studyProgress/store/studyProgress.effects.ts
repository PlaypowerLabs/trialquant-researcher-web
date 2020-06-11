import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../core.state';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { filter, switchMap, map, tap } from 'rxjs/operators';
import * as StudyProgressActions from './studyProgress.actions';
import { StudyProgressDataService } from '../studyProgress.data.service';
import { selectSelectedStudyId } from '../../study/store/study.selectors';

@Injectable()
export class StudyProgressEffects {
  constructor(
    private studyProgressDataService: StudyProgressDataService,
    private store$: Store<AppState>,
    private actions$: Actions,
    private router: Router
  ) { }

  // fetchStudyProgress
  @Effect()
  fetchStudy$ = this.store$.pipe(
    select(selectSelectedStudyId),
    filter(studyId => !!studyId),
    switchMap((studyId) => {
      return this.studyProgressDataService.fetchStudyProgressByStudyId(studyId).pipe(
        filter(studyProgressArray => !!studyProgressArray && studyProgressArray.length > 0),
        switchMap((studyProgressArray) => {
          return [
            StudyProgressActions.LoadStudyProgress({ payload: { studyProgressArray } })
          ];
        })
      );
    })
  );

}
