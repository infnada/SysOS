import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ManagedObjectReference} from './managed-object-reference';
export interface DatacenterMismatchArgument extends DynamicData {
  entity: ManagedObjectReference & { $type: 'ManagedEntity' };
  inputDatacenter?: ManagedObjectReference & { $type: 'Datacenter' };
}
