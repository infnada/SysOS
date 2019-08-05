import {HostEvent} from './host-event';

export interface HostDasErrorEvent extends HostEvent {
  message?: string;
  reason?: string;
}
