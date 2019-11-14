import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface ResourcePoolResourceUsage extends DynamicData {
  maxUsage: Long;
  overallUsage: Long;
  reservationUsed: Long;
  reservationUsedForVm: Long;
  unreservedForPool: Long;
  unreservedForVm: Long;
}
