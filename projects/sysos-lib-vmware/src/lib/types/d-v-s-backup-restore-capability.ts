import {DynamicData} from './dynamic-data';

export interface DVSBackupRestoreCapability extends DynamicData {
  backupRestoreSupported: boolean;
}
