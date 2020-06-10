import { createAction, props } from '@ngrx/store';
import { Study } from './study.model';

export const FetchStudies = createAction(
  '[Study] Fetch Studies'
);

export const LoadStudies = createAction(
  '[Study] LoadStudies Studies',
  props<{ payload: { studyArray: Study[] } }>()
);

export const SetSelectedStudyId = createAction(
  '[Study] Set Selected Study Id',
  props<{ payload: { studyId: string } }>()
);
