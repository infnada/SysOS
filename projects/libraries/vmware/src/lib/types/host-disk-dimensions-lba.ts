import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface HostDiskDimensionsLba extends DynamicData {
  block: Long;
  blockSize: Int;
}
