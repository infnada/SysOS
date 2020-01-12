import {HostEvent} from './host-event';

import {HostEventArgument} from './host-event-argument';
import {VmEventArgument} from './vm-event-argument';
import {Long} from './long';
export interface HostWwnConflictEvent extends HostEvent {
  conflictedHosts?: HostEventArgument[];
  conflictedVms?: VmEventArgument[];
  wwn: Long;
}
