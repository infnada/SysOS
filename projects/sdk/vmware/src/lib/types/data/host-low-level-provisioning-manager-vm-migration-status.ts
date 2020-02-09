import {DynamicData} from './dynamic-data';


export interface HostLowLevelProvisioningManagerVmMigrationStatus extends DynamicData {
  consideredSuccessful: boolean;
  migrationId: number;
  source: boolean;
  type: string;
}