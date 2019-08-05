import {NotEnoughLicenses} from './not-enough-licenses';
import {Int} from './int';
import {DateTime} from './date-time';

export interface ExpiredFeatureLicense extends NotEnoughLicenses {
  count: Int;
  expirationDate: DateTime;
  feature: string;
}
