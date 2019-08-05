import {VmEvent} from './vm-event';
import {Long} from './long';

export interface VmTimedoutStartingSecondaryEvent extends VmEvent {
  timeout?: Long;
}
