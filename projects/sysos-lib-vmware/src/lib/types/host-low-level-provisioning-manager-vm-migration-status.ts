import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface HostLowLevelProvisioningManagerVmMigrationStatus extends DynamicData {
  consideredSuccessful: boolean;
  migrationId: Long;
  source: boolean;
  type: string;
}
