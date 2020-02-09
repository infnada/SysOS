import {HostDasEvent} from './host-das-event';


export interface HostNoAvailableNetworksEvent extends HostDasEvent {
  ips?: string;
}