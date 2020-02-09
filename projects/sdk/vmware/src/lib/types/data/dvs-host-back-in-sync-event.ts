import {DvsEvent} from './dvs-event';

import {HostEventArgument} from './host-event-argument';

export interface DvsHostBackInSyncEvent extends DvsEvent {
  hostBackInSync: HostEventArgument;
}