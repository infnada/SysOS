import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface ConflictingConfigurationConfig extends DynamicData {
  entity?: ManagedObjectReference & { $type: 'ManagedEntity'; };
  propertyPath: string;
}