import {NotEnoughLicenses} from './not-enough-licenses';


export interface LicenseExpired extends NotEnoughLicenses {
  licenseKey: string;
}