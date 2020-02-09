import {DynamicData} from './dynamic-data';

import {DistributedVirtualSwitchHostMemberConfigInfo} from './distributed-virtual-switch-host-member-config-info';
import {DistributedVirtualSwitchProductSpec} from './distributed-virtual-switch-product-spec';
import {DistributedVirtualSwitchHostMemberRuntimeState} from './distributed-virtual-switch-host-member-runtime-state';

export interface DistributedVirtualSwitchHostMember extends DynamicData {
  config: DistributedVirtualSwitchHostMemberConfigInfo;
  productInfo?: DistributedVirtualSwitchProductSpec;
  runtimeState?: DistributedVirtualSwitchHostMemberRuntimeState;
  status: string;
  statusDetail?: string;
  uplinkPortKey?: string[];
}