import {VmEvent} from './vm-event';

export interface VmFaultToleranceVmTerminatedEvent extends VmEvent {
  reason?: string;
}
