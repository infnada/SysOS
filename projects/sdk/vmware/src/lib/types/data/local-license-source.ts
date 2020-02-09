import {LicenseSource} from './license-source';


export interface LocalLicenseSource extends LicenseSource {
  licenseKeys: string;
}