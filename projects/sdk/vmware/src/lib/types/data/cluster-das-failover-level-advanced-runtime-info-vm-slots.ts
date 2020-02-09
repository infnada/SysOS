import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterDasFailoverLevelAdvancedRuntimeInfoVmSlots extends DynamicData {
  slots: number;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}