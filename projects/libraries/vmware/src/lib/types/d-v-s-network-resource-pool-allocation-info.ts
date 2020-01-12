import {DynamicData} from './dynamic-data';

import {SharesInfo} from './shares-info';
import {Int} from './int';
import {Long} from './long';
export interface DVSNetworkResourcePoolAllocationInfo extends DynamicData {
  limit?: Long;
  priorityTag?: Int;
  shares?: SharesInfo;
}
