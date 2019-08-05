import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface UserPrivilegeResult extends DynamicData {
  entity: ManagedObjectReference & { $type: 'ManagedEntity' };
  privileges?: string[];
}
