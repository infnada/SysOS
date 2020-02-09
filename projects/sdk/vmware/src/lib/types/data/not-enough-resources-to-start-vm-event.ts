import {VmEvent} from './vm-event';


export interface NotEnoughResourcesToStartVmEvent extends VmEvent {
  reason: string;
}