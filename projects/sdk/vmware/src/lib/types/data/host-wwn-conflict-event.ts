import {HostEvent} from './host-event';

import {HostEventArgument} from './host-event-argument';
import {VmEventArgument} from './vm-event-argument';

export interface HostWwnConflictEvent extends HostEvent {
  conflictedHosts?: HostEventArgument[];
  conflictedVms?: VmEventArgument[];
  wwn: number;
}