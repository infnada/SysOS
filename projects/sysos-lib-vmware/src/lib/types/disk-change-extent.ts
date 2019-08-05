import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface DiskChangeExtent extends DynamicData {
  length: Long;
  start: Long;
}
