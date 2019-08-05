import {DynamicData} from './dynamic-data';

import {HostPnicNetworkResourceInfo} from './host-pnic-network-resource-info';
export interface HostNetworkResourceRuntime extends DynamicData {
  pnicResourceInfo: HostPnicNetworkResourceInfo[];
}
