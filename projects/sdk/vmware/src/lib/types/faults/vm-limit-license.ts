import {NotEnoughLicenses} from './not-enough-licenses';


export interface VmLimitLicense extends NotEnoughLicenses {
  limit: number;
}