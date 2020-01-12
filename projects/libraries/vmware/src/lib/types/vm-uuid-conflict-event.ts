import {VmEvent} from './vm-event';

import {VmEventArgument} from './vm-event-argument';
export interface VmUuidConflictEvent extends VmEvent {
  conflictedVm: VmEventArgument;
  uuid: string;
}
