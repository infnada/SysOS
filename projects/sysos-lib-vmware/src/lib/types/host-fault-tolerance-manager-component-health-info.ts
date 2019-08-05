import {DynamicData} from './dynamic-data';

export interface HostFaultToleranceManagerComponentHealthInfo extends DynamicData {
  isNetworkHealthy: boolean;
  isStorageHealthy: boolean;
}
