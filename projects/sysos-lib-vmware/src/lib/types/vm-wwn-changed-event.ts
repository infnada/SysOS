import {VmEvent} from './vm-event';
import {Long} from './long';

export interface VmWwnChangedEvent extends VmEvent {
  newNodeWwns?: Long[];
  newPortWwns?: Long[];
  oldNodeWwns?: Long[];
  oldPortWwns?: Long[];
}
