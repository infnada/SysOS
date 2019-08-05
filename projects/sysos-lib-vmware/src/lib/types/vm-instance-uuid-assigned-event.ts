import {VmEvent} from './vm-event';

export interface VmInstanceUuidAssignedEvent extends VmEvent {
  instanceUuid: string;
}
