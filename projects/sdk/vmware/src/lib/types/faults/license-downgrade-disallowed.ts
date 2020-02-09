import {NotEnoughLicenses} from './not-enough-licenses';

import {KeyAnyValue} from '../data/key-any-value';

export interface LicenseDowngradeDisallowed extends NotEnoughLicenses {
  edition: string;
  entityId: string;
  features: KeyAnyValue[];
}