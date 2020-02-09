import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface DistributedVirtualSwitchManagerHostContainer extends DynamicData {
  container: ManagedObjectReference & { $type: 'ManagedEntity'; };
  recursive: boolean;
}