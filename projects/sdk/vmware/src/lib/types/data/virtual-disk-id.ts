import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface VirtualDiskId extends DynamicData {
  diskId: number;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}