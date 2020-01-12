import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Byte} from './byte';
import {Long} from './long';

export interface HostDiskPartitionAttributes extends DynamicData {
  attributes: Byte;
  endSector: Long;
  guid?: string;
  logical: boolean;
  partition: Int;
  partitionAlignment?: Long;
  startSector: Long;
  type: string;
}
