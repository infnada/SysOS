import {VmEvent} from './vm-event';


export interface VmWwnAssignedEvent extends VmEvent {
  nodeWwns: number[];
  portWwns: number[];
}