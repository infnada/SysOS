import {DistributedVirtualSwitchManagerHostDvsFilterSpec} from './distributed-virtual-switch-manager-host-dvs-filter-spec';

import {ManagedObjectReference} from './managed-object-reference';

export interface DistributedVirtualSwitchManagerHostDvsMembershipFilter extends DistributedVirtualSwitchManagerHostDvsFilterSpec {
  distributedVirtualSwitch: ManagedObjectReference & { $type: 'DistributedVirtualSwitch'; };
}