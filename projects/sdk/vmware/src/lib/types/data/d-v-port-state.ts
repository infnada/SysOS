import {DynamicData} from './dynamic-data';

import {DVPortStatus} from './d-v-port-status';
import {DistributedVirtualSwitchPortStatistics} from './distributed-virtual-switch-port-statistics';
import {DistributedVirtualSwitchKeyedOpaqueBlob} from './distributed-virtual-switch-keyed-opaque-blob';

export interface DVPortState extends DynamicData {
  runtimeInfo?: DVPortStatus;
  stats: DistributedVirtualSwitchPortStatistics;
  vendorSpecificState?: DistributedVirtualSwitchKeyedOpaqueBlob[];
}