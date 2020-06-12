import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../core.state';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { StudyDataService } from '../study.data.service';
import { selectUserId } from '../../auth/store/auth.selectors';
import { filter, switchMap, map, tap, withLatestFrom, catchError } from 'rxjs/operators';
import { Study } from './study.model';
import * as StudyActions from './study.actions';
import { selectStudyIdFromRouterState, selectSelectedStudyDoc } from './study.selectors';
import { saveAs } from 'file-saver';

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
    tap(() => this.store$.dispatch(StudyActions.LoadStudiesStart())),
    switchMap((researcherId) => {
      return this.studyDataService.fetchProtocolsIds(researcherId).pipe(
        filter(protocolIds => !!protocolIds && protocolIds.length > 0),
        switchMap((protocolIds) => {
          return this.studyDataService.fetchStudies(protocolIds).pipe(
            switchMap((studyArray: Study[]) => {
              return [
                StudyActions.LoadStudiesSuccess({ payload: { studyArray } })
              ];
            }),
            catchError((error) => {
              return [
                StudyActions.LoadStudiesFailed()
              ];
            })
          );
        }),
        catchError((error) => {
          return [
            StudyActions.LoadStudiesFailed()
          ];
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

  // Effect to download study protocol csv file
  exportStudyProtocolCSV$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudyActions.ExportStudyProtocolStart),
      withLatestFrom(this.store$.pipe(select(selectSelectedStudyDoc))),
      switchMap(([, studyDoc]) => {
        return this.studyDataService.getProtocolDocByID(studyDoc.protocolId).pipe(
          switchMap((protocolDocData) => {
            console.log('protocolDoc:', protocolDocData.data());
            const protocolDoc = protocolDocData.data();
            return this.studyDataService.getProtocolCSVDownloadURL(protocolDoc.protocolCSVRef).pipe(
              switchMap((url) => {
                saveAs(url, 'protocol_' + protocolDoc.id);
                return [
                  StudyActions.ExportStudyProtocolSuccess()
                ];
              }),
              catchError((error) => {
                return [
                  StudyActions.ExportStudyProtocolFailed(error.message)
                ];
              })
            );
          }),
          catchError((error) => {
            return [
              StudyActions.ExportStudyProtocolFailed(error.message)
            ];
          })
        );
      }),
      catchError((error) => {
        return [
          StudyActions.ExportStudyProtocolFailed(error.message)
        ];
      })
    )
  );

  // Effect to trial logs CSV
  exportCSV$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudyActions.ExportStudyStart),
      withLatestFrom(this.store$.pipe(select(selectSelectedStudyDoc))),
      switchMap(([, studyDoc]) => {
        return this.studyDataService.downloadStudyTrialLogsCSV(studyDoc.id).pipe(
          switchMap((result) => {
            console.log('Result :', result);
            return [StudyActions.ExportStudySuccess()];
          }),
          catchError((error) => {
            return [
              StudyActions.ExportStudyFailed(error.message)
            ];
          })
        );
      }),
      catchError((error) => {
        return [
          StudyActions.ExportStudyFailed(error.message)
        ];
      })
    )
  );
}
