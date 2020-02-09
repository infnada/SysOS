import {DvsEvent} from './dvs-event';

import {DistributedVirtualSwitchProductSpec} from './distributed-virtual-switch-product-spec';

export interface DvsUpgradeRejectedEvent extends DvsEvent {
  productInfo: DistributedVirtualSwitchProductSpec;
}