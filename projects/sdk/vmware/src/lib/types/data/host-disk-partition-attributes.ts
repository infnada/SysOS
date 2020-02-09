import {DynamicData} from './dynamic-data';


export interface HostDiskPartitionAttributes extends DynamicData {
  attributes: number;
  endSector: number;
  guid?: string;
  logical: boolean;
  partition: number;
  partitionAlignment?: number;
  startSector: number;
  type: string;
}