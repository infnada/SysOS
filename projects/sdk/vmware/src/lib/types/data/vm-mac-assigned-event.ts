import {VmEvent} from './vm-event';


export interface VmMacAssignedEvent extends VmEvent {
  adapter: string;
  mac: string;
}