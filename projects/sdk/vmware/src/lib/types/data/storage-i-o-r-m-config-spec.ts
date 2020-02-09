import {DynamicData} from './dynamic-data';


export interface StorageIORMConfigSpec extends DynamicData {
  congestionThreshold?: number;
  congestionThresholdMode?: string;
  enabled?: boolean;
  percentOfPeakThroughput?: number;
  reservableIopsThreshold?: number;
  reservationEnabled?: boolean;
  statsAggregationDisabled?: boolean;
  statsCollectionEnabled?: boolean;
}