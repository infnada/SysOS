import {HostEvent} from './host-event';

export interface DatastorePrincipalConfigured extends HostEvent {
  datastorePrincipal: string;
}
