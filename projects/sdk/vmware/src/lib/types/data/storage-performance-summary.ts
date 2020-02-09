import {DynamicData} from './dynamic-data';


export interface StoragePerformanceSummary extends DynamicData {
  datastoreReadIops: any[];
  datastoreReadLatency: any[];
  datastoreVmLatency: any[];
  datastoreWriteIops: any[];
  datastoreWriteLatency: any[];
  interval: number;
  percentile: number[];
  siocActivityDuration: number;
}