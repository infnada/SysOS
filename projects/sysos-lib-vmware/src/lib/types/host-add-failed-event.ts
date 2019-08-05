import {HostEvent} from './host-event';

export interface HostAddFailedEvent extends HostEvent {
  hostname: string;
}
