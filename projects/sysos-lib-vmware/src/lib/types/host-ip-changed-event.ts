import {HostEvent} from './host-event';

export interface HostIpChangedEvent extends HostEvent {
  newIP: string;
  oldIP: string;
}
