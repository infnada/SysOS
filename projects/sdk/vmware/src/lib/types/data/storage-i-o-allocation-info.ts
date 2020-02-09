import {DynamicData} from './dynamic-data';

import {SharesInfo} from './shares-info';

export interface StorageIOAllocationInfo extends DynamicData {
  limit?: number;
  reservation?: number;
  shares?: SharesInfo;
}