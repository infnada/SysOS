import {DvsEvent} from './dvs-event';

import {DistributedVirtualSwitchProductSpec} from './distributed-virtual-switch-product-spec';
export interface DvsUpgradeAvailableEvent extends DvsEvent {
  productInfo: DistributedVirtualSwitchProductSpec;
}
