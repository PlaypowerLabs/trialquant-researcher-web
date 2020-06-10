import { Action, createReducer, on } from '@ngrx/store';
import { StudyState, Study } from './study.model';
import * as StudyActions from './study.actions';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const adapter: EntityAdapter<Study> = createEntityAdapter<Study>();
export const initialState: StudyState = adapter.getInitialState({
    isLoading: false,
    selectedStudyId: null
});

const reducer = createReducer(
  initialState,
  on(
    StudyActions.FetchStudies,
    (state) => ({ ...state })
  )
);

export function studyReducer(state: StudyState | undefined, action: Action): StudyState {
  return reducer(state, action);
}
