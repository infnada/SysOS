import {DynamicData} from './dynamic-data';

import {LicenseFeatureInfoState} from '../enums/license-feature-info-state';

export interface LicenseFeatureInfo extends DynamicData {
  costUnit: string;
  dependentKey?: string[];
  edition?: boolean;
  expiresOn?: string;
  featureDescription?: string;
  featureName: string;
  key: string;
  sourceRestriction?: string;
  state?: LicenseFeatureInfoState;
}