import { createAction, props } from '@ngrx/store';
import { Study } from './study.model';

export const FetchStudies = createAction(
  '[Study] Fetch Studies'
);

export const LoadStudiesStart = createAction(
  '[Study] Load Studies Start',
);

export const LoadStudiesSuccess = createAction(
  '[Study] LoadS Studies Success',
  props<{ payload: { studyArray: Study[] } }>()
);

export const LoadStudiesFailed = createAction(
  '[Study] Load Studies Failed',
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
