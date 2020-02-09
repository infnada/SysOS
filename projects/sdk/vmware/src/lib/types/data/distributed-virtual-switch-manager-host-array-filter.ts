import {DistributedVirtualSwitchManagerHostDvsFilterSpec} from './distributed-virtual-switch-manager-host-dvs-filter-spec';

import {ManagedObjectReference} from './managed-object-reference';

export interface DistributedVirtualSwitchManagerHostArrayFilter extends DistributedVirtualSwitchManagerHostDvsFilterSpec {
  host: ManagedObjectReference & { $type: 'HostSystem[]'; };
}