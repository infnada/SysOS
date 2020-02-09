import {DynamicData} from './dynamic-data';

import {DVSBackupRestoreCapability} from './d-v-s-backup-restore-capability';
import {DVSHealthCheckCapability} from './d-v-s-health-check-capability';
import {DVSNetworkResourceManagementCapability} from './d-v-s-network-resource-management-capability';
import {DVSRollbackCapability} from './d-v-s-rollback-capability';

export interface DVSFeatureCapability extends DynamicData {
  backupRestoreCapability?: DVSBackupRestoreCapability;
  healthCheckCapability?: DVSHealthCheckCapability;
  macLearningSupported?: boolean;
  networkFilterSupported?: boolean;
  networkResourceManagementCapability?: DVSNetworkResourceManagementCapability;
  networkResourceManagementSupported: boolean;
  networkResourcePoolHighShareValue?: number;
  nicTeamingPolicy?: string[];
  rollbackCapability?: DVSRollbackCapability;
  vmDirectPathGen2Supported: boolean;
}