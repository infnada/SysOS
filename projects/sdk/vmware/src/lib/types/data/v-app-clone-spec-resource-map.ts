import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ResourceConfigSpec} from './resource-config-spec';

export interface VAppCloneSpecResourceMap extends DynamicData {
  location?: ManagedObjectReference & { $type: 'Datastore'; };
  parent?: ManagedObjectReference & { $type: 'ResourcePool'; };
  resourceSpec?: ResourceConfigSpec;
  source: ManagedObjectReference & { $type: 'ManagedEntity'; };
}