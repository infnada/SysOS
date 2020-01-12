import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface EntityBackupConfig extends DynamicData {
  configVersion?: string;
  container?: ManagedObjectReference & { $type: 'ManagedEntity' };
  entityType: string;
  key?: string;
  name?: string;
}
