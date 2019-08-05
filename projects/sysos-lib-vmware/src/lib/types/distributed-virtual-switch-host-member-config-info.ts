import {DynamicData} from './dynamic-data';

import {DistributedVirtualSwitchHostMemberBacking} from './distributed-virtual-switch-host-member-backing';
import {ManagedObjectReference} from './managed-object-reference';
import {DistributedVirtualSwitchKeyedOpaqueBlob} from './distributed-virtual-switch-keyed-opaque-blob';
import {Int} from './int';
export interface DistributedVirtualSwitchHostMemberConfigInfo extends DynamicData {
  backing: DistributedVirtualSwitchHostMemberBacking;
  host?: ManagedObjectReference & { $type: 'HostSystem' };
  maxProxySwitchPorts: Int;
  vendorSpecificConfig?: DistributedVirtualSwitchKeyedOpaqueBlob[];
}
