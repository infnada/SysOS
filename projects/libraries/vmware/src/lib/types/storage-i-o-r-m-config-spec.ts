import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface StorageIORMConfigSpec extends DynamicData {
  congestionThreshold?: Int;
  congestionThresholdMode?: string;
  enabled?: boolean;
  percentOfPeakThroughput?: Int;
  reservableIopsThreshold?: Int;
  reservationEnabled?: boolean;
  statsAggregationDisabled?: boolean;
  statsCollectionEnabled?: boolean;
}
