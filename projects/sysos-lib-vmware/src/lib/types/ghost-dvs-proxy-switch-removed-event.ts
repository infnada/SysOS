import {HostEvent} from './host-event';

export interface GhostDvsProxySwitchRemovedEvent extends HostEvent {
  switchUuid: string[];
}
