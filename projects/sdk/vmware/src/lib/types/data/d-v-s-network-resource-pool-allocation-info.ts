import {DynamicData} from './dynamic-data';

import {SharesInfo} from './shares-info';

export interface DVSNetworkResourcePoolAllocationInfo extends DynamicData {
  limit?: number;
  priorityTag?: number;
  shares?: SharesInfo;
}