import {HostEvent} from './host-event';

export interface HostDisconnectedEvent extends HostEvent {
  reason?: string;
}
