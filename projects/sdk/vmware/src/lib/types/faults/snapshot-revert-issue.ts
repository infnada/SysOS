import {MigrationFault} from './migration-fault';

import {Event} from '../data/event';

export interface SnapshotRevertIssue extends MigrationFault {
  errors: boolean;
  event?: Event[];
  snapshotName?: string;
}