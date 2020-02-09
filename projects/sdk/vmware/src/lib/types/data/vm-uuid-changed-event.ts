import {VmEvent} from './vm-event';


export interface VmUuidChangedEvent extends VmEvent {
  newUuid: string;
  oldUuid: string;
}