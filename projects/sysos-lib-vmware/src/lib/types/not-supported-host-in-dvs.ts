import {NotSupportedHost} from './not-supported-host';

import {DistributedVirtualSwitchProductSpec} from './distributed-virtual-switch-product-spec';
export interface NotSupportedHostInDvs extends NotSupportedHost {
  switchProductSpec: DistributedVirtualSwitchProductSpec;
}
