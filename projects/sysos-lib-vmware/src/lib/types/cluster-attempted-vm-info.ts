import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ManagedObjectReference} from './managed-object-reference';
export interface ClusterAttemptedVmInfo extends DynamicData {
  task?: ManagedObjectReference & { $type: 'Task' };
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
}
