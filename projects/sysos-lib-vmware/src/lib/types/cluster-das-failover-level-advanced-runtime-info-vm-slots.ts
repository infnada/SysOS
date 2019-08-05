import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface ClusterDasFailoverLevelAdvancedRuntimeInfoVmSlots extends DynamicData {
  slots: Int;
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
}
