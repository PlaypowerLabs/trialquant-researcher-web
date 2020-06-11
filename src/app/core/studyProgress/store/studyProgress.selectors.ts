import { selectAll } from './studyProgress.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudyProgressState, State } from './studyProgress.model';

export const selectStudyProgressState = createFeatureSelector<State, StudyProgressState>('studyProgress');

export const selectAllStudyProgress = createSelector(
  selectStudyProgressState,
  selectAll
);

export const selectMaximumSessionsCount = createSelector(
  selectAllStudyProgress,
  (studyProgressArray) => {
    if (studyProgressArray && studyProgressArray.length > 0) {
      return Object.keys(studyProgressArray[0].activityProgress).length;
    }
    return 0;
  }
);
