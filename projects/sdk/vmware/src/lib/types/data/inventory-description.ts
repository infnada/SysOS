import {DynamicData} from './dynamic-data';


export interface InventoryDescription extends DynamicData {
  numClusters?: number;
  numCpuDev?: number;
  numDiskDev?: number;
  numHosts: number;
  numNetDev?: number;
  numResourcePools?: number;
  numvCpuDev?: number;
  numvDiskDev?: number;
  numVirtualMachines: number;
  numvNetDev?: number;
}