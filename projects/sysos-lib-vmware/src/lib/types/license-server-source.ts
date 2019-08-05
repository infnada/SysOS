import {LicenseSource} from './license-source';

export interface LicenseServerSource extends LicenseSource {
  licenseServer: string;
}
