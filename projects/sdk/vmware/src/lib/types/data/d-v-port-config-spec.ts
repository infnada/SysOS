import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {DVPortSetting} from './d-v-port-setting';

export interface DVPortConfigSpec extends DynamicData {
  configVersion?: string;
  description?: string;
  key?: string;
  name?: string;
  operation: string;
  scope?: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
  setting?: DVPortSetting;
}