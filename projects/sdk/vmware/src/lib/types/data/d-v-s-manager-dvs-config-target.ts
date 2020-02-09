import {DynamicData} from './dynamic-data';

import {DistributedVirtualPortgroupInfo} from './distributed-virtual-portgroup-info';
import {DistributedVirtualSwitchInfo} from './distributed-virtual-switch-info';

export interface DVSManagerDvsConfigTarget extends DynamicData {
  distributedVirtualPortgroup?: DistributedVirtualPortgroupInfo[];
  distributedVirtualSwitch?: DistributedVirtualSwitchInfo[];
}