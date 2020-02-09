import {VmCloneEvent} from './vm-clone-event';

import {VmEventArgument} from './vm-event-argument';

export interface VmClonedEvent extends VmCloneEvent {
  sourceVm: VmEventArgument;
}