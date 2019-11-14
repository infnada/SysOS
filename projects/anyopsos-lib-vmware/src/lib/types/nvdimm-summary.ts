import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface NvdimmSummary extends DynamicData {
  availableCapacity: Long;
  blockCapacity: Long;
  healthStatus: string;
  numDimms: Int;
  numInterleavesets: Int;
  numNamespaces: Int;
  persistentCapacity: Long;
  totalCapacity: Long;
}
