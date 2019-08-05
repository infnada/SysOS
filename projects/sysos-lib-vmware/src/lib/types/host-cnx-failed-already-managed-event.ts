import {HostEvent} from './host-event';

export interface HostCnxFailedAlreadyManagedEvent extends HostEvent {
  serverName: string;
}
