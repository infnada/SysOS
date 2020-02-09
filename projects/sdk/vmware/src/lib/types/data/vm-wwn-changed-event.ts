import {VmEvent} from './vm-event';


export interface VmWwnChangedEvent extends VmEvent {
  newNodeWwns?: number[];
  newPortWwns?: number[];
  oldNodeWwns?: number[];
  oldPortWwns?: number[];
}