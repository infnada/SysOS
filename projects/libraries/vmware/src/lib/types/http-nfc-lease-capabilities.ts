import {DynamicData} from './dynamic-data';

export interface HttpNfcLeaseCapabilities extends DynamicData {
  corsSupported: boolean;
  pullModeSupported: boolean;
}
