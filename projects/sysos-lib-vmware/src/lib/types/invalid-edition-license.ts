import {NotEnoughLicenses} from './not-enough-licenses';

export interface InvalidEditionLicense extends NotEnoughLicenses {
  feature: string;
}
