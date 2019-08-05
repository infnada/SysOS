import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostScsiDiskPartition extends DynamicData {
  diskName: string;
  partition: Int;
}
