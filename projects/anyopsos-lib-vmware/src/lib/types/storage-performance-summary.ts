import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface StoragePerformanceSummary extends DynamicData {
  datastoreReadIops: double[];
  datastoreReadLatency: double[];
  datastoreVmLatency: double[];
  datastoreWriteIops: double[];
  datastoreWriteLatency: double[];
  interval: Int;
  percentile: Int[];
  siocActivityDuration: Int;
}
