import {DvsEvent} from './dvs-event';

import {DistributedVirtualSwitchProductSpec} from './distributed-virtual-switch-product-spec';

export interface DvsUpgradedEvent extends DvsEvent {
  productInfo: DistributedVirtualSwitchProductSpec;
}