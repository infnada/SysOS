import {NotEnoughLicenses} from './not-enough-licenses';
import {Int} from './int';

export interface VmLimitLicense extends NotEnoughLicenses {
  limit: Int;
}
