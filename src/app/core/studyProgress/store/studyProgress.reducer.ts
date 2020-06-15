import { Action, createReducer, on } from '@ngrx/store';
import { StudyProgress, StudyProgressState } from './studyProgress.model';
import * as StudyProgressActions from './studyProgress.actions';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const adapter: EntityAdapter<StudyProgress> = createEntityAdapter<StudyProgress>();
export const initialState: StudyProgressState = adapter.getInitialState({
  isLoadingStudyProgress: false
});

const reducer = createReducer(
  initialState,
  on(
    StudyProgressActions.LoadStudyProgressStart,
    (state) => ({ ...state, isLoadingStudyProgress: true })
  ),
  on(
    StudyProgressActions.LoadStudyProgressSuccess,
    (state, { payload: { studyProgressArray } }) => {
      return adapter.addAll(studyProgressArray, { ...state, isLoadingStudyProgress: false });
    }
  ),
  on(
    StudyProgressActions.LoadStudyProgressFailed,
    (state) => ({ ...state, isLoadingStudyProgress: false })
  ),
  on(
    StudyProgressActions.ClearStudyProgress,
    (state) => {
      return adapter.removeAll(state);
    }
  ),
);

export function studyReducer(state: StudyProgressState | undefined, action: Action): StudyProgressState {
  return reducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
