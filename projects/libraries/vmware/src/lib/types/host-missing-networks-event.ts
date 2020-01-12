import {HostDasEvent} from './host-das-event';

export interface HostMissingNetworksEvent extends HostDasEvent {
  ips?: string;
}
