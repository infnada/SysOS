import {DynamicData} from './dynamic-data';

import {DVSCapability} from './d-v-s-capability';
import {DVSConfigSpec} from './d-v-s-config-spec';
import {DistributedVirtualSwitchProductSpec} from './distributed-virtual-switch-product-spec';
export interface DVSCreateSpec extends DynamicData {
  capability?: DVSCapability;
  configSpec: DVSConfigSpec;
  productInfo?: DistributedVirtualSwitchProductSpec;
}
