import {ManagedObjectReference} from '../data/managed-object-reference';
import {DistributedVirtualSwitchProductSpec} from '../data/distributed-virtual-switch-product-spec';


export interface QueryCompatibleHostForNewDvs {
  _this: ManagedObjectReference;
  container: ManagedObjectReference & { $type: 'ManagedEntity'; };
  recursive: boolean;
  switchProductSpec?: DistributedVirtualSwitchProductSpec;
}