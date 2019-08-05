import {HostEvent} from './host-event';

export interface VcAgentUpgradeFailedEvent extends HostEvent {
  reason?: string;
}
