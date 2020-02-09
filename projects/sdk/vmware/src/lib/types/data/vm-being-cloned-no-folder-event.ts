import {VmCloneEvent} from './vm-clone-event';

import {HostEventArgument} from './host-event-argument';

export interface VmBeingClonedNoFolderEvent extends VmCloneEvent {
  destHost: HostEventArgument;
  destName: string;
}