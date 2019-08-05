import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface ResourcePoolQuickStats extends DynamicData {
  balloonedMemory?: Long;
  compressedMemory?: Long;
  consumedOverheadMemory?: Long;
  distributedCpuEntitlement?: Long;
  distributedMemoryEntitlement?: Long;
  guestMemoryUsage?: Long;
  hostMemoryUsage?: Long;
  overallCpuDemand?: Long;
  overallCpuUsage?: Long;
  overheadMemory?: Long;
  privateMemory?: Long;
  sharedMemory?: Long;
  staticCpuEntitlement?: Int;
  staticMemoryEntitlement?: Int;
  swappedMemory?: Long;
}
