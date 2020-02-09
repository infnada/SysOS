import {SessionEvent} from './session-event';


export interface SessionTerminatedEvent extends SessionEvent {
  sessionId: string;
  terminatedUsername: string;
}