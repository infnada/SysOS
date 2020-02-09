import {VmEvent} from './vm-event';


export interface VmPrimaryFailoverEvent extends VmEvent {
  reason?: string;
}