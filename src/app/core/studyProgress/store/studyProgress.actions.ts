import { createAction, props } from '@ngrx/store';
import { StudyProgress } from './studyProgress.model';

export const LoadStudyProgressStart = createAction(
  '[StudyProgress] Load Study Progress Start'
);

export const LoadStudyProgressSuccess = createAction(
  '[StudyProgress] Load Study Progress Success',
  props<{ payload: { studyProgressArray: StudyProgress[] } }>()
);

export const LoadStudyProgressFailed = createAction(
  '[StudyProgress] Load Study Progress Failed'
);

export const ClearStudyProgress = createAction(
  '[StudyProgress] Clear Study Progress State'
);
