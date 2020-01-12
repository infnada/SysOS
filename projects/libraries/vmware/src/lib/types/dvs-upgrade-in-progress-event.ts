import {DvsEvent} from './dvs-event';

import {DistributedVirtualSwitchProductSpec} from './distributed-virtual-switch-product-spec';
export interface DvsUpgradeInProgressEvent extends DvsEvent {
  productInfo: DistributedVirtualSwitchProductSpec;
}
