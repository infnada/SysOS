import {NotEnoughLicenses} from './not-enough-licenses';

import {LicenseSource} from './license-source';
export interface LicenseSourceUnavailable extends NotEnoughLicenses {
  licenseSource: LicenseSource;
}
