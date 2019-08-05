import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface VsanUpgradeSystemNetworkPartitionInfo extends DynamicData {
  hosts: ManagedObjectReference[] & { $type: 'HostSystem' };
}
