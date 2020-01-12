import {DynamicData} from './dynamic-data';

import {HostPlacedVirtualNicIdentifier} from './host-placed-virtual-nic-identifier';
import {Long} from './long';
export interface HostPnicNetworkResourceInfo extends DynamicData {
  availableBandwidthForVMTraffic?: HostPlacedVirtualNicIdentifier[];
  pnicDevice?: Long;
}
