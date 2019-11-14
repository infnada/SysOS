import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface InventoryDescription extends DynamicData {
  numClusters?: Int;
  numCpuDev?: Int;
  numDiskDev?: Int;
  numHosts: Int;
  numNetDev?: Int;
  numResourcePools?: Int;
  numvCpuDev?: Int;
  numvDiskDev?: Int;
  numVirtualMachines: Int;
  numvNetDev?: Int;
}
