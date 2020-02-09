import {ManagedObjectReference} from '../data/managed-object-reference';
import {EntityBackupConfig} from '../data/entity-backup-config';


export interface DVPortgroupRollback_Task {
  _this: ManagedObjectReference;
  entityBackup?: EntityBackupConfig;
}