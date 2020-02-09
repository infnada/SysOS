import {DynamicData} from './dynamic-data';

import {KeyValue} from './key-value';
import {KeyAnyValue} from './key-any-value';

export interface LicenseManagerLicenseInfo extends DynamicData {
  costUnit: string;
  editionKey: string;
  labels?: KeyValue[];
  licenseKey: string;
  name: string;
  properties?: KeyAnyValue[];
  total: number;
  used?: number;
}