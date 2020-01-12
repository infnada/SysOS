import {NotEnoughLicenses} from './not-enough-licenses';
import {Int} from './int';

export interface VramLimitLicense extends NotEnoughLicenses {
  limit: Int;
}
