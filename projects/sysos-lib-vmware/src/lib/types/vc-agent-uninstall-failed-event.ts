import {HostEvent} from './host-event';

export interface VcAgentUninstallFailedEvent extends HostEvent {
  reason?: string;
}
