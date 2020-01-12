import {DvsEvent} from './dvs-event';

import {DvsOutOfSyncHostArgument} from './dvs-out-of-sync-host-argument';
export interface OutOfSyncDvsHost extends DvsEvent {
  hostOutOfSync: DvsOutOfSyncHostArgument[];
}
