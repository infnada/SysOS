import {ManagedObjectReference} from '../data/managed-object-reference';
import {DistributedVirtualSwitchProductSpec} from '../data/distributed-virtual-switch-product-spec';


export interface QueryDvsCompatibleHostSpec {
  _this: ManagedObjectReference;
  switchProductSpec?: DistributedVirtualSwitchProductSpec;
}