import {NotEnoughLicenses} from './not-enough-licenses';


export interface ExpiredFeatureLicense extends NotEnoughLicenses {
  count: number;
  expirationDate: string;
  feature: string;
}