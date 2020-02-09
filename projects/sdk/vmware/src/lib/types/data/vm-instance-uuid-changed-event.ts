import {VmEvent} from './vm-event';


export interface VmInstanceUuidChangedEvent extends VmEvent {
  newInstanceUuid: string;
  oldInstanceUuid: string;
}