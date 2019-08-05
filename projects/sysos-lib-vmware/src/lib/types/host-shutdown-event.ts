import {HostEvent} from './host-event';

export interface HostShutdownEvent extends HostEvent {
  reason: string;
}
