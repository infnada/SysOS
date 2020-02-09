import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {DVPortSetting} from './d-v-port-setting';

export interface DVPortConfigInfo extends DynamicData {
  configVersion: string;
  description?: string;
  name?: string;
  scope?: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
  setting?: DVPortSetting;
}