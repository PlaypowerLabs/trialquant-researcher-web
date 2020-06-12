import { EntityState } from '@ngrx/entity';
import { AppState } from '../../core.state';
export interface ProtocolMetadata {
  day: number;
  session: number;
  link: string;
  duration?: number;
}

export interface Protocol {
  id: string;
  name: string;
  createdBy: string;
  protocolCSVRef: string;
  protocolData: ProtocolMetadata[];
  createTime: string;
}

export interface Activity {
  id: string;
  link: string;
  duration?: number;
}

export interface ParticipantInfo {
  participantId: string;
  startDate: string;
}

export interface Study {
  id: string;
  name: string;
  studyCode: string;
  protocolId: string;
  status: StudyStatus;
  participantsInfo: ParticipantInfo[];
  activities: Activity[];
  createTime: string;
}

export enum StudyStatus {
  ENABLED = 'enabled',
  PAUSED = 'paused',
  ARCHIVED = 'archived'
}

export interface StudyState extends EntityState<Study> {
  isLoading: boolean;
  selectedStudyId: string;
}

export interface State extends AppState {
  study: StudyState;
}
