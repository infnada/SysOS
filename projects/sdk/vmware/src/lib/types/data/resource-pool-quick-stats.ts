import {DynamicData} from './dynamic-data';


export interface ResourcePoolQuickStats extends DynamicData {
  balloonedMemory?: number;
  compressedMemory?: number;
  consumedOverheadMemory?: number;
  distributedCpuEntitlement?: number;
  distributedMemoryEntitlement?: number;
  guestMemoryUsage?: number;
  hostMemoryUsage?: number;
  overallCpuDemand?: number;
  overallCpuUsage?: number;
  overheadMemory?: number;
  privateMemory?: number;
  sharedMemory?: number;
  staticCpuEntitlement?: number;
  staticMemoryEntitlement?: number;
  swappedMemory?: number;
}