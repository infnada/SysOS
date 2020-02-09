import {ManagedObjectReference} from '../data/managed-object-reference';
import {DistributedVirtualSwitchManagerHostContainer} from '../data/distributed-virtual-switch-manager-host-container';
import {DistributedVirtualSwitchManagerDvsProductSpec} from '../data/distributed-virtual-switch-manager-dvs-product-spec';
import {DistributedVirtualSwitchManagerHostDvsFilterSpec} from '../data/distributed-virtual-switch-manager-host-dvs-filter-spec';


export interface QueryDvsCheckCompatibility {
  _this: ManagedObjectReference;
  hostContainer: DistributedVirtualSwitchManagerHostContainer;
  dvsProductSpec?: DistributedVirtualSwitchManagerDvsProductSpec;
  hostFilterSpec?: DistributedVirtualSwitchManagerHostDvsFilterSpec[];
}