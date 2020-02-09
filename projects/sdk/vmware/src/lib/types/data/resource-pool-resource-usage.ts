import {DynamicData} from './dynamic-data';


export interface ResourcePoolResourceUsage extends DynamicData {
  maxUsage: number;
  overallUsage: number;
  reservationUsed: number;
  reservationUsedForVm: number;
  unreservedForPool: number;
  unreservedForVm: number;
}