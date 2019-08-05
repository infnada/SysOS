import {SessionEvent} from './session-event';

export interface BadUsernameSessionEvent extends SessionEvent {
  ipAddress: string;
}
