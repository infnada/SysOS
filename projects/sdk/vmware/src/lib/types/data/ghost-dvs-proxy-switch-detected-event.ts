import {HostEvent} from './host-event';


export interface GhostDvsProxySwitchDetectedEvent extends HostEvent {
  switchUuid: string[];
}