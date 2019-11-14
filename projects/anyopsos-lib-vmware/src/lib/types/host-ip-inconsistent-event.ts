import {HostEvent} from './host-event';

export interface HostIpInconsistentEvent extends HostEvent {
  ipAddress: string;
}
