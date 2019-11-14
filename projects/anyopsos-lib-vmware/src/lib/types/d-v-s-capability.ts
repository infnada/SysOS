import {DynamicData} from './dynamic-data';

import {DistributedVirtualSwitchHostProductSpec} from './distributed-virtual-switch-host-product-spec';
import {DVSFeatureCapability} from './d-v-s-feature-capability';
export interface DVSCapability extends DynamicData {
  compatibleHostComponentProductInfo?: DistributedVirtualSwitchHostProductSpec[];
  dvPortGroupOperationSupported?: boolean;
  dvPortOperationSupported?: boolean;
  dvsOperationSupported?: boolean;
  featuresSupported?: DVSFeatureCapability;
}
