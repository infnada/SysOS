import {VmEvent} from './vm-event';
import {Long} from './long';

export interface VmWwnAssignedEvent extends VmEvent {
  nodeWwns: Long[];
  portWwns: Long[];
}
