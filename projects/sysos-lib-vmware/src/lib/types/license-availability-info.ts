import {DynamicData} from './dynamic-data';

import {LicenseFeatureInfo} from './license-feature-info';
import {Int} from './int';
export interface LicenseAvailabilityInfo extends DynamicData {
  available: Int;
  feature: LicenseFeatureInfo;
  total: Int;
}
