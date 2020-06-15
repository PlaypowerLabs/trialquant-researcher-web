import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core.state';
import { selectAllStudy, selectSelectedStudyDoc, selectIsLoadingStudies, selectIsExportingStudyProtocolCSV, selectIsExportingTrialLogCSV } from './store/study.selectors';
import * as StudyActions from './store/study.actions';

@Injectable()
export class StudyService {
  constructor(
    private store$: Store<AppState>
  ) { }

  allStudies$ = this.store$.pipe(select(selectAllStudy));
  selectedStudyDoc$ = this.store$.pipe(select(selectSelectedStudyDoc));
  isLoadingStudies$ = this.store$.pipe(select(selectIsLoadingStudies));

  isExportingTrialLogCSV$ = this.store$.pipe(select(selectIsExportingTrialLogCSV));
  isExportingStudyProtocolCSV$ = this.store$.pipe(select(selectIsExportingStudyProtocolCSV));

  setSelectedStudyId(studyId) {
    this.store$.dispatch(StudyActions.SetSelectedStudyId({ payload: { studyId } }));
  }

  exportProtocolCSV() {
    this.store$.dispatch(StudyActions.ExportStudyProtocolStart());
  }

  exportCSV() {
    this.store$.dispatch(StudyActions.ExportStudyStart());
  }
}
