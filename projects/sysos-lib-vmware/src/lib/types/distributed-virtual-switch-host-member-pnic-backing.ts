import {DistributedVirtualSwitchHostMemberBacking} from './distributed-virtual-switch-host-member-backing';

import {DistributedVirtualSwitchHostMemberPnicSpec} from './distributed-virtual-switch-host-member-pnic-spec';
export interface DistributedVirtualSwitchHostMemberPnicBacking extends DistributedVirtualSwitchHostMemberBacking {
  pnicSpec?: DistributedVirtualSwitchHostMemberPnicSpec[];
}
