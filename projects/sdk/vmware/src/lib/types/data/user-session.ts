import {DynamicData} from './dynamic-data';


export interface UserSession extends DynamicData {
  callCount: number;
  extensionSession: boolean;
  fullName: string;
  ipAddress: string;
  key: string;
  lastActiveTime: string;
  locale: string;
  loginTime: string;
  messageLocale: string;
  userAgent: string;
  userName: string;
}