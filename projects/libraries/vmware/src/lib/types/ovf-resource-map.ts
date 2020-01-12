import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ResourceConfigSpec} from './resource-config-spec';
export interface OvfResourceMap extends DynamicData {
  parent?: ManagedObjectReference & { $type: 'ResourcePool' };
  resourceSpec?: ResourceConfigSpec;
  source: string;
}
