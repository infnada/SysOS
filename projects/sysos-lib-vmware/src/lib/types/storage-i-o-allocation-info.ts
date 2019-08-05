import {DynamicData} from './dynamic-data';

import {SharesInfo} from './shares-info';
import {Int} from './int';
import {Long} from './long';
export interface StorageIOAllocationInfo extends DynamicData {
  limit?: Long;
  reservation?: Int;
  shares?: SharesInfo;
}
