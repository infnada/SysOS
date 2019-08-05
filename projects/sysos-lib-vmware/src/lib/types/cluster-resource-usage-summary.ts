import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface ClusterResourceUsageSummary extends DynamicData {
  cpuCapacityMHz?: Long;
  pMemCapacityMB?: Long;
  storageCapacityMB: Long;
  storageUsedMB: Long;
}
