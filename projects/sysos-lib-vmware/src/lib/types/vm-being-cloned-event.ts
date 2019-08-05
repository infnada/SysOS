import {VmCloneEvent} from './vm-clone-event';

import {FolderEventArgument} from './folder-event-argument';
import {HostEventArgument} from './host-event-argument';
export interface VmBeingClonedEvent extends VmCloneEvent {
  destFolder: FolderEventArgument;
  destHost: HostEventArgument;
  destName: string;
}
