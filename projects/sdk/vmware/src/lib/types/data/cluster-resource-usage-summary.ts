import {DynamicData} from './dynamic-data';


export interface ClusterResourceUsageSummary extends DynamicData {
  cpuCapacityMHz: number;
  cpuUsedMHz: number;
  memCapacityMB: number;
  memUsedMB: number;
  pMemAvailableMB?: number;
  pMemCapacityMB?: number;
  storageCapacityMB: number;
  storageUsedMB: number;
}