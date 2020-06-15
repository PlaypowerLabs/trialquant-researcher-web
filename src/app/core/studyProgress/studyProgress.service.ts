import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core.state';
import { selectAllStudyProgress, selectMaximumSessionsCount, selectIsLoadingStudyProgress } from './store/studyProgress.selectors';
import * as StudentProgressActions from './store/studyProgress.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class StudyProgressService {
  constructor(
    private store$: Store<AppState>
  ) { }

  allStudiesProgress$ = this.store$.pipe(select(selectAllStudyProgress)).pipe(
    map((studyProgressArray) => {
      const modifiedStudyProgressArray = studyProgressArray.map(studyProgress => {
        // sort activity progress by day_session
        const activityProgress = Object.keys(studyProgress.activityProgress).map(activityId => {
          return {
            id: activityId,
            ...studyProgress.activityProgress[activityId]
          };
        });
        activityProgress.sort((a, b) => {
          const [dayA, sessionA] = a.id.split('_');
          const [dayB, sessionB] = b.id.split('_');
          if (parseFloat(dayA) > parseFloat(dayB)) {
            return 1;
          } else {
            if (parseFloat(dayA) === parseFloat(dayB)) {
              if (parseFloat(sessionA) > parseFloat(sessionB)) {
                return 1;
              } else {
                return -1;
              }
            } else {
              return -1;
            }
          }
        });
        return {
          ...studyProgress,
          activityProgress
        };
      });
      return modifiedStudyProgressArray;
    })
  );

  sessionIndexArray$ = this.store$.pipe(select(selectMaximumSessionsCount)).pipe(
    map((maxIndex) => {
      const sessionIndex = [];
      for (let i = 1; i <= maxIndex; i++) {
        sessionIndex.push(i);
      }
      return sessionIndex;
    })
  );

  isLoadingStudyProgress$ = this.store$.pipe(select(selectIsLoadingStudyProgress));

  clearStudyProgressState() {
    this.store$.dispatch(StudentProgressActions.ClearStudyProgress());
  }
}
