import {HostDasEvent} from './host-das-event';

export interface HostPrimaryAgentNotShortNameEvent extends HostDasEvent {
  primaryAgent: string;
}
