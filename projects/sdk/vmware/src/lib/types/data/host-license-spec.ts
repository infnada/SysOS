import {DynamicData} from './dynamic-data';

import {LicenseSource} from './license-source';

export interface HostLicenseSpec extends DynamicData {
  disabledFeatureKey?: string[];
  editionKey?: string;
  enabledFeatureKey?: string[];
  source?: LicenseSource;
}