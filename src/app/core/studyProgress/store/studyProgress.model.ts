import { EntityState } from '@ngrx/entity';
import { AppState } from '../../core.state';

export interface StudyProgress {
  id: string;
  participantId: string;
  studyId: string;
  protocolId: string;
  activityProgress: {
    [key: string]: ActivityProgress;
  };
}

export interface ActivityProgress {
  scheduleTime: string;
  isCompleted: boolean;
  isAttempted: boolean;
  progress: {};
}

export interface StudyProgressState extends EntityState<StudyProgress> {

}

export interface State extends AppState {
  studyProgress: StudyProgressState;
}
