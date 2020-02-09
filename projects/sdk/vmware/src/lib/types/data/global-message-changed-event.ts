import {SessionEvent} from './session-event';


export interface GlobalMessageChangedEvent extends SessionEvent {
  message: string;
  prevMessage?: string;
}