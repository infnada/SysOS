import {VmEvent} from './vm-event';

import {HostEventArgument} from './host-event-argument';
import {VmEventArgument} from './vm-event-argument';
import {Long} from './long';
export interface VmWwnConflictEvent extends VmEvent {
  conflictedHosts?: HostEventArgument[];
  conflictedVms?: VmEventArgument[];
  wwn: Long;
}
