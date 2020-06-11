import { createAction, props } from '@ngrx/store';
import { StudyProgress } from './studyProgress.model';

export const FetchStudyProgress = createAction(
  '[StudyProgress] Fetch Study Progress'
);

export const LoadStudyProgress = createAction(
  '[StudyProgress] Load Study Progress',
  props<{ payload: { studyProgressArray: StudyProgress[] } }>()
);

export const ClearStudyProgress = createAction(
  '[StudyProgress] Clear Study Progress State'
);
