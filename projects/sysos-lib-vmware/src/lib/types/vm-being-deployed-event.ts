import {VmEvent} from './vm-event';

import {VmEventArgument} from './vm-event-argument';
export interface VmBeingDeployedEvent extends VmEvent {
  srcTemplate: VmEventArgument;
}
