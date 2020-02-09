import {DynamicData} from './dynamic-data';

import {DistributedVirtualSwitchHostMemberBacking} from './distributed-virtual-switch-host-member-backing';

export interface HostProxySwitchSpec extends DynamicData {
  backing?: DistributedVirtualSwitchHostMemberBacking;
}