import {VmEvent} from './vm-event';


export interface CustomizationEvent extends VmEvent {
  logLocation?: string;
}