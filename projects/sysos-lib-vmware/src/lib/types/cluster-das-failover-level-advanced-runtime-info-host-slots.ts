import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface ClusterDasFailoverLevelAdvancedRuntimeInfoHostSlots extends DynamicData {
  host: ManagedObjectReference & { $type: 'HostSystem' };
  slots: Int;
}
