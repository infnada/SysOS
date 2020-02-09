import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {PrivilegeAvailability} from './privilege-availability';

export interface EntityPrivilege extends DynamicData {
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  privAvailability: PrivilegeAvailability[];
}