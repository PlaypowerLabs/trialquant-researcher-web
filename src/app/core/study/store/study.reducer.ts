import { Action, createReducer, on } from '@ngrx/store';
import { StudyState, Study } from './study.model';
import * as StudyActions from './study.actions';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const adapter: EntityAdapter<Study> = createEntityAdapter<Study>();
export const initialState: StudyState = adapter.getInitialState({
  isLoadingStudies: false,
  selectedStudyId: null
});

const reducer = createReducer(
  initialState,
  on(
    StudyActions.FetchStudies,
    (state) => ({ ...state })
  ),
  on(
    StudyActions.LoadStudiesSuccess,
    (state, { payload: { studyArray } }) => {
      return adapter.addAll(studyArray, { ...state, isLoadingStudies: false });
    }
  ),
  on(
    StudyActions.LoadStudiesStart,
    (state) => {
      return { ...state, isLoadingStudies: true };
    }
  ),
  on(
    StudyActions.LoadStudiesFailed,
    (state) => {
      return { ...state, isLoadingStudies: false };
    }
  ),
  on(
    StudyActions.SetSelectedStudyId,
    (state, { payload: { studyId } }) => {
      return { ...state, selectedStudyId: studyId };
    }
  ),
  on(
    StudyActions.ExportStudyStart,
    (state) => {
      return { ...state, isExportingTrialLogCSV: true };
    }
  ),
  on(
    StudyActions.ExportStudySuccess,
    StudyActions.ExportStudyFailed,
    (state) => {
      return { ...state, isExportingTrialLogCSV: false };
    }
  ),
  on(
    StudyActions.ExportStudyProtocolStart,
    (state) => {
      return { ...state, isExportingStudyProtocolCSV: true };
    }
  ),
  on(
    StudyActions.ExportStudyProtocolFailed,
    StudyActions.ExportStudyProtocolSuccess,
    (state) => {
      return { ...state, isExportingStudyProtocolCSV: false };
    }
  ),
);

export function studyReducer(state: StudyState | undefined, action: Action): StudyState {
  return reducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
