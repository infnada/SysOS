import {SessionEvent} from './session-event';


export interface UserLoginSessionEvent extends SessionEvent {
  ipAddress: string;
  locale: string;
  sessionId: string;
  userAgent?: string;
}