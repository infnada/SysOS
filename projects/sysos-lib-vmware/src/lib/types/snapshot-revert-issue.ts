import {MigrationFault} from './migration-fault';

import {Event} from './event';
export interface SnapshotRevertIssue extends MigrationFault {
  errors: boolean;
  event?: Event[];
  snapshotName?: string;
}
