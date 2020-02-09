import {NotEnoughLicenses} from './not-enough-licenses';


export interface VramLimitLicense extends NotEnoughLicenses {
  limit: number;
}