import {HostEvent} from './host-event';

export interface HostShortNameToIpFailedEvent extends HostEvent {
  shortName: string;
}
