import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface Permission extends DynamicData {
  entity?: ManagedObjectReference & { $type: 'ManagedEntity' };
  group: boolean;
  principal: string;
  propagate: boolean;
  roleId: Int;
}
