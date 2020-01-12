import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Double} from './double';

export interface StoragePerformanceSummary extends DynamicData {
  datastoreReadIops: Double[];
  datastoreReadLatency: Double[];
  datastoreVmLatency: Double[];
  datastoreWriteIops: Double[];
  datastoreWriteLatency: Double[];
  interval: Int;
  percentile: Int[];
  siocActivityDuration: Int;
}
