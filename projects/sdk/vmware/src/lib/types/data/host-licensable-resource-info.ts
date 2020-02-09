import {DynamicData} from './dynamic-data';

import {KeyAnyValue} from './key-any-value';

export interface HostLicensableResourceInfo extends DynamicData {
  resource: KeyAnyValue[];
}