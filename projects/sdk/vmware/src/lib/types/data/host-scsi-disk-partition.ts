import {DynamicData} from './dynamic-data';


export interface HostScsiDiskPartition extends DynamicData {
  diskName: string;
  partition: number;
}