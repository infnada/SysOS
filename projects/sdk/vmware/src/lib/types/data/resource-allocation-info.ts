import {DynamicData} from './dynamic-data';

import {SharesInfo} from './shares-info';

export interface ResourceAllocationInfo extends DynamicData {
  expandableReservation?: boolean;
  limit?: number;
  overheadLimit?: number;
  reservation?: number;
  shares?: SharesInfo;
}