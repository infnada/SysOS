import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface HostReliableMemoryInfo extends DynamicData {
  memorySize: Long;
}
