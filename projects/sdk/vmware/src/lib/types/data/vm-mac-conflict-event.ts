import {VmEvent} from './vm-event';

import {VmEventArgument} from './vm-event-argument';

export interface VmMacConflictEvent extends VmEvent {
  conflictedVm: VmEventArgument;
  mac: string;
}