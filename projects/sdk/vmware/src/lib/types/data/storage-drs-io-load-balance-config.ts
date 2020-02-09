import {DynamicData} from './dynamic-data';


export interface StorageDrsIoLoadBalanceConfig extends DynamicData {
  ioLatencyThreshold?: number;
  ioLoadImbalanceThreshold?: number;
  reservableIopsThreshold?: number;
  reservablePercentThreshold?: number;
  reservableThresholdMode?: string;
}