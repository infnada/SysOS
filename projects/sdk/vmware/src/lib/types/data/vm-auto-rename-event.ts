import {VmEvent} from './vm-event';


export interface VmAutoRenameEvent extends VmEvent {
  newName: string;
  oldName: string;
}