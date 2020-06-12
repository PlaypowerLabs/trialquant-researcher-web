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

export const ExportStudyProtocolStart = createAction(
  '[Study] Export Study Protocol Start',
);

export const ExportStudyProtocolSuccess = createAction(
  '[Study] Export Study Protocol Success',
);

export const ExportStudyProtocolFailed = createAction(
  '[Study] Export Study Protocol Failed',
  props<{ payload: { error: string } }>()
);

export const ExportStudyStart = createAction(
  '[Study] Export Study Start',
);

export const ExportStudySuccess = createAction(
  '[Study] Export Study Success',
);

export const ExportStudyFailed = createAction(
  '[Study] Export Study Failed',
  props<{ payload: { error: string } }>()
);
