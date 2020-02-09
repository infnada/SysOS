import {HostDasEvent} from './host-das-event';


export interface HostShortNameInconsistentEvent extends HostDasEvent {
  shortName: string;
  shortName2: string;
}