import {SessionEvent} from './session-event';
import {DateTime} from './date-time';
import {Long} from './long';

export interface UserLogoutSessionEvent extends SessionEvent {
  callCount?: Long;
  ipAddress?: string;
  loginTime?: DateTime;
  sessionId?: string;
  userAgent?: string;
}
