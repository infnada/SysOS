import {ManagedObjectReference} from '../data/managed-object-reference';
import {DistributedVirtualSwitchProductSpec} from '../data/distributed-virtual-switch-product-spec';


export interface PerformDvsProductSpecOperation_Task {
  _this: ManagedObjectReference;
  operation: string;
  productSpec?: DistributedVirtualSwitchProductSpec;
}