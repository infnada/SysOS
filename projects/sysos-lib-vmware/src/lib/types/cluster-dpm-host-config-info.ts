import {DynamicData} from './dynamic-data';

import {DpmBehavior} from './dpm-behavior';
import {ManagedObjectReference} from './managed-object-reference';
export interface ClusterDpmHostConfigInfo extends DynamicData {
  behavior?: DpmBehavior;
  enabled?: boolean;
  key: ManagedObjectReference & { $type: 'HostSystem' };
}
