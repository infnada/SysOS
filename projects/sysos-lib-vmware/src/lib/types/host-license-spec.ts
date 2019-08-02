import {LicenseSource} from "./license-source";

export interface HostLicenseSpec {
  disabledFeatureKey?: string[];
  editionKey?: string;
  enabledFeatureKey?: string[];
  source?: LicenseSource;
}
