import {VmEvent} from './vm-event';

export interface VmFailedStartingSecondaryEvent extends VmEvent {
  reason?: string;
}
