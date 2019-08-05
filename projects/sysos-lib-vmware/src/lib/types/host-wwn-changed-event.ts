import {HostEvent} from './host-event';
import {Long} from './long';

export interface HostWwnChangedEvent extends HostEvent {
  newNodeWwns?: Long[];
  newPortWwns?: Long[];
  oldNodeWwns?: Long[];
  oldPortWwns?: Long[];
}
