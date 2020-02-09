import {DvsEvent} from './dvs-event';

import {DvsOutOfSyncHostArgument} from './dvs-out-of-sync-host-argument';

export interface DvsHostWentOutOfSyncEvent extends DvsEvent {
  hostOutOfSync: DvsOutOfSyncHostArgument;
}