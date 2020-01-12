import {DynamicData} from './dynamic-data';

import {SharesInfo} from './shares-info';
import {Long} from './long';
export interface DvsHostInfrastructureTrafficResourceAllocation extends DynamicData {
  limit?: Long;
  reservation?: Long;
  shares?: SharesInfo;
}
