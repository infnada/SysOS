import {VmEvent} from './vm-event';

import {VmEventArgument} from './vm-event-argument';
export interface VmDeployedEvent extends VmEvent {
  srcTemplate: VmEventArgument;
}
