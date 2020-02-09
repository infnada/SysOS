import {DynamicData} from './dynamic-data';

import {LicenseFeatureInfo} from './license-feature-info';
import {LicenseReservationInfo} from './license-reservation-info';
import {LicenseSource} from './license-source';

export interface LicenseUsageInfo extends DynamicData {
  featureInfo?: LicenseFeatureInfo[];
  reservationInfo?: LicenseReservationInfo[];
  source: LicenseSource;
  sourceAvailable: boolean;
}