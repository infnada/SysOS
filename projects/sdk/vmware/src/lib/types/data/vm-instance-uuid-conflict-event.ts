import {VmEvent} from './vm-event';

import {VmEventArgument} from './vm-event-argument';

export interface VmInstanceUuidConflictEvent extends VmEvent {
  conflictedVm: VmEventArgument;
  instanceUuid: string;
}