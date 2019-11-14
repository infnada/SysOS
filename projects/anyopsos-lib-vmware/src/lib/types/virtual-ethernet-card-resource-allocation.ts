import {DynamicData} from './dynamic-data';

import {SharesInfo} from './shares-info';
import {Long} from './long';
export interface VirtualEthernetCardResourceAllocation extends DynamicData {
  limit?: Long;
  reservation?: Long;
  share: SharesInfo;
}
