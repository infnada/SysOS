import {DynamicData} from './dynamic-data';

import {SharesInfo} from './shares-info';

export interface DvsHostInfrastructureTrafficResourceAllocation extends DynamicData {
  limit?: number;
  reservation?: number;
  shares?: SharesInfo;
}