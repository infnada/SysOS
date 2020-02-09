import {DynamicData} from './dynamic-data';

import {LicenseFeatureInfo} from './license-feature-info';

export interface LicenseAvailabilityInfo extends DynamicData {
  available: number;
  feature: LicenseFeatureInfo;
  total: number;
}