import {HostDasEvent} from './host-das-event';


export interface HostIsolationIpPingFailedEvent extends HostDasEvent {
  isolationIp: string;
}