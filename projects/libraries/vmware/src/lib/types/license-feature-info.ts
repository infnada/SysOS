import {DynamicData} from './dynamic-data';

import {LicenseFeatureInfoState} from './license-feature-info-state';
import {DateTime} from './date-time';
export interface LicenseFeatureInfo extends DynamicData {
  costUnit: string;
  dependentKey?: string[];
  edition?: boolean;
  expiresOn?: DateTime;
  featureDescription?: string;
  featureName: string;
  key: string;
  sourceRestriction?: string;
  state?: LicenseFeatureInfoState;
}
