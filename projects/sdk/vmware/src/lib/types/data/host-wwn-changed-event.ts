import {HostEvent} from './host-event';


export interface HostWwnChangedEvent extends HostEvent {
  newNodeWwns?: number[];
  newPortWwns?: number[];
  oldNodeWwns?: number[];
  oldPortWwns?: number[];
}