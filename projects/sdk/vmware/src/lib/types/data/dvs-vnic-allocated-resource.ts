import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface DvsVnicAllocatedResource extends DynamicData {
  reservation?: number;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  vnicKey: string;
}