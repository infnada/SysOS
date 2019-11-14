import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface StoragePodSummary extends DynamicData {
  capacity: Long;
  freeSpace: Long;
  name: string;
}
