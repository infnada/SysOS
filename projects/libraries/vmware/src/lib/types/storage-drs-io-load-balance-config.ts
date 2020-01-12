import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface StorageDrsIoLoadBalanceConfig extends DynamicData {
  ioLatencyThreshold?: Int;
  ioLoadImbalanceThreshold?: Int;
  reservableIopsThreshold?: Int;
  reservablePercentThreshold?: Int;
  reservableThresholdMode?: string;
}
