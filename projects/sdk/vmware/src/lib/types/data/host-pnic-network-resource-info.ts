import {DynamicData} from './dynamic-data';

import {HostPlacedVirtualNicIdentifier} from './host-placed-virtual-nic-identifier';

export interface HostPnicNetworkResourceInfo extends DynamicData {
  availableBandwidthForVMTraffic?: number;
  placedVirtualNics?: HostPlacedVirtualNicIdentifier[];
  pnicDevice: string;
  unusedBandwidthForVMTraffic?: number;
}