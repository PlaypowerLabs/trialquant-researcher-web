import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../core.state';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { StudyDataService } from '../study.data.service';
import { selectUserId } from '../../auth/store/auth.selectors';
import { filter, switchMap, map, tap } from 'rxjs/operators';
import { Study } from './study.model';
import * as StudyActions from './study.actions';
import { selectStudyIdFromRouterState } from './study.selectors';

@Injectable()
export class StudyEffects {
  constructor(
    private studyDataService: StudyDataService,
    private store$: Store<AppState>,
    private actions$: Actions,
    private router: Router
  ) { }

  // fetchStudyEffect
  @Effect()
  fetchStudy$ = this.store$.pipe(
    select(selectUserId),
    filter(userId => !!userId),
    switchMap((researcherId) => {
      return this.studyDataService.fetchProtocolsIds(researcherId).pipe(
        filter(protocolIds => !!protocolIds && protocolIds.length > 0),
        switchMap((protocolIds) => {
          return this.studyDataService.fetchStudies(protocolIds).pipe(
            switchMap((studyArray: Study[]) => {
              return [
                StudyActions.LoadStudies({ payload: { studyArray } })
              ];
            })
          );
        })
      );
    })
  );

  @Effect({ dispatch: false })
  setSelectedStudyId$ = this.store$.pipe(
    select(selectStudyIdFromRouterState),
    filter(studyId => !!studyId),
    tap(studyId => {
      this.store$.dispatch(StudyActions.SetSelectedStudyId({ payload: { studyId } }));
    }),
  );

}
