import {DynamicData} from './dynamic-data';

import {SharesInfo} from './shares-info';
import {Long} from './long';
export interface ResourceAllocationInfo extends DynamicData {
  expandableReservation?: boolean;
  limit?: Long;
  overheadLimit?: Long;
  reservation?: Long;
  shares?: SharesInfo;
}
