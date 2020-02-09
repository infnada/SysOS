import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterDasFailoverLevelAdvancedRuntimeInfoHostSlots extends DynamicData {
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  slots: number;
}