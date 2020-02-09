import {Event} from './event';

import {LicenseFeatureInfo} from './license-feature-info';

export interface LicenseExpiredEvent extends Event {
  feature: LicenseFeatureInfo;
}