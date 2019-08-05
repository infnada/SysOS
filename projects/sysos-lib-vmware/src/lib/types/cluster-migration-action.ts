import {ClusterAction} from './cluster-action';

import {ClusterDrsMigration} from './cluster-drs-migration';
export interface ClusterMigrationAction extends ClusterAction {
  drsMigration?: ClusterDrsMigration;
}
