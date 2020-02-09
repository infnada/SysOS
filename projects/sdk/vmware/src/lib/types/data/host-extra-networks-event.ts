import {HostDasEvent} from './host-das-event';


export interface HostExtraNetworksEvent extends HostDasEvent {
  ips?: string;
}