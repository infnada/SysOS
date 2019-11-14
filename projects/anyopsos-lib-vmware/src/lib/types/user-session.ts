import {DynamicData} from './dynamic-data';
import {DateTime} from './date-time';
import {Long} from './long';

export interface UserSession extends DynamicData {
  callCount: Long;
  extensionSession: boolean;
  fullName: string;
  ipAddress: string;
  key: string;
  lastActiveTime: DateTime;
  locale: string;
  loginTime: DateTime;
  messageLocale: string;
  userAgent: string;
  userName: string;
}
