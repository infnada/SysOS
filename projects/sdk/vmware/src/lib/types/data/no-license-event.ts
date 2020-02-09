import {LicenseEvent} from './license-event';

import {LicenseFeatureInfo} from './license-feature-info';

export interface NoLicenseEvent extends LicenseEvent {
  feature: LicenseFeatureInfo;
}