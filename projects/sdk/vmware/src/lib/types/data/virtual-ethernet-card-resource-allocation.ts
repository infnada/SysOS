import {DynamicData} from './dynamic-data';

import {SharesInfo} from './shares-info';

export interface VirtualEthernetCardResourceAllocation extends DynamicData {
  limit?: number;
  reservation?: number;
  share: SharesInfo;
}