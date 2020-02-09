import {VmCloneEvent} from './vm-clone-event';

import {FolderEventArgument} from './folder-event-argument';
import {HostEventArgument} from './host-event-argument';
import {LocalizedMethodFault} from './localized-method-fault';

export interface VmCloneFailedEvent extends VmCloneEvent {
  destFolder: FolderEventArgument;
  destHost: HostEventArgument;
  destName: string;
  reason: LocalizedMethodFault;
}