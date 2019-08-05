import {InheritablePolicy} from './inheritable-policy';

import {DistributedVirtualSwitchKeyedOpaqueBlob} from './distributed-virtual-switch-keyed-opaque-blob';
export interface DVSVendorSpecificConfig extends InheritablePolicy {
  keyValue?: DistributedVirtualSwitchKeyedOpaqueBlob[];
}
