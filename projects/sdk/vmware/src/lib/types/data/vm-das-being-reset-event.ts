import {VmEvent} from './vm-event';


export interface VmDasBeingResetEvent extends VmEvent {
  reason?: string;
}