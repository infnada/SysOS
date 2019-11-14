import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface DvsVmVnicResourceAllocation extends DynamicData {
  reservationQuota?: Long;
}
