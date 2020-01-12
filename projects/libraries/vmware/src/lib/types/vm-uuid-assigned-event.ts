import {VmEvent} from './vm-event';

export interface VmUuidAssignedEvent extends VmEvent {
  uuid: string;
}
