import {DynamicData} from './dynamic-data';

import {ResourceConfigSpec} from './resource-config-spec';
import {ManagedObjectReference} from './managed-object-reference';
export interface VAppCloneSpecResourceMap extends DynamicData {
  resourceSpec?: ResourceConfigSpec;
  source: ManagedObjectReference & { $type: 'ManagedEntity' };
}
