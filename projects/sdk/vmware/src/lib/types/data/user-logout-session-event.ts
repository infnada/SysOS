import {SessionEvent} from './session-event';


export interface UserLogoutSessionEvent extends SessionEvent {
  callCount?: number;
  ipAddress?: string;
  loginTime?: string;
  sessionId?: string;
  userAgent?: string;
}