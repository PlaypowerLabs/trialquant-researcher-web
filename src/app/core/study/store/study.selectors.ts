import { selectAll } from './study.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudyState, State } from './study.model';
import { selectRouterState } from '../../core.state';

export const selectStudyState = createFeatureSelector<State, StudyState>('study');

export const selectAllStudy = createSelector(
  selectStudyState,
  selectAll
);

export const selectStudyById = (id: string) => createSelector(
  selectAllStudy,
  allStudy => allStudy.find(study => study.id === id)
);

export const selectSelectedStudyId = createSelector(
  selectStudyState,
  state => state.selectedStudyId
);

export const selectStudyIdFromRouterState = createSelector(
  selectRouterState,
  router => router && router.state.params.studyId
);

export const selectSelectedStudyDoc = createSelector(
  selectAllStudy,
  selectSelectedStudyId,
  (allStudy, selectedStudyId) => {
    return allStudy.find(study => study.id === selectedStudyId);
  }
);
