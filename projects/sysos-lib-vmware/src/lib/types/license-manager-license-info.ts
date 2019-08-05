import {DynamicData} from './dynamic-data';

import {KeyValue} from './key-value';
import {KeyAnyValue} from './key-any-value';
import {Int} from './int';
export interface LicenseManagerLicenseInfo extends DynamicData {
  costUnit: string;
  editionKey: string;
  labels?: KeyValue[];
  licenseKey: string;
  name?: KeyAnyValue[];
  total?: Int;
}
