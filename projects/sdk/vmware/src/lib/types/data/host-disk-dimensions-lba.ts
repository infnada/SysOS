import {DynamicData} from './dynamic-data';


export interface HostDiskDimensionsLba extends DynamicData {
  block: number;
  blockSize: number;
}