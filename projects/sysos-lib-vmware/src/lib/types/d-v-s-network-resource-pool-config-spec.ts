import {DynamicData} from './dynamic-data';

import {DVSNetworkResourcePoolAllocationInfo} from './d-v-s-network-resource-pool-allocation-info';
export interface DVSNetworkResourcePoolConfigSpec extends DynamicData {
  allocationInfo?: DVSNetworkResourcePoolAllocationInfo;
  configVersion?: string;
  description?: string;
  key: string;
  name?: string;
}
