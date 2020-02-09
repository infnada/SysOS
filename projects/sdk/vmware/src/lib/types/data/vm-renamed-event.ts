import {VmEvent} from './vm-event';


export interface VmRenamedEvent extends VmEvent {
  newName: string;
  oldName: string;
}