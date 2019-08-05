import {DynamicData} from './dynamic-data';

import {DVSBackupRestoreCapability} from './d-v-s-backup-restore-capability';
import {DVSHealthCheckCapability} from './d-v-s-health-check-capability';
import {DVSNetworkResourceManagementCapability} from './d-v-s-network-resource-management-capability';
import {DVSRollbackCapability} from './d-v-s-rollback-capability';
import {Int} from './int';
export interface DVSFeatureCapability extends DynamicData {
  backupRestoreCapability?: DVSBackupRestoreCapability;
  healthCheckCapability?: DVSHealthCheckCapability;
  macLearningSupported?: boolean;
  networkFilterSupported?: boolean;
  networkResourceManagementCapability?: DVSNetworkResourceManagementCapability;
  networkResourceManagementSupported: boolean;
  networkResourcePoolHighShareValue?: Int;
  nicTeamingPolicy?: string[];
  rollbackCapability?: DVSRollbackCapability;
}
