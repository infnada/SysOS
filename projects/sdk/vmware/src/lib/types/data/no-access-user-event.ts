import {SessionEvent} from './session-event';


export interface NoAccessUserEvent extends SessionEvent {
  ipAddress: string;
}