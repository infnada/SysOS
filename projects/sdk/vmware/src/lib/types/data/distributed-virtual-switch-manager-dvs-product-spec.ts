import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {DistributedVirtualSwitchProductSpec} from './distributed-virtual-switch-product-spec';

export interface DistributedVirtualSwitchManagerDvsProductSpec extends DynamicData {
  distributedVirtualSwitch?: ManagedObjectReference & { $type: 'DistributedVirtualSwitch'; };
  newSwitchProductSpec?: DistributedVirtualSwitchProductSpec;
}