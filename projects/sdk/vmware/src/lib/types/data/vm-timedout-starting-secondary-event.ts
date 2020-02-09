import {VmEvent} from './vm-event';


export interface VmTimedoutStartingSecondaryEvent extends VmEvent {
  timeout?: number;
}