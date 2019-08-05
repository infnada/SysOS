import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface VirtualDiskId extends DynamicData {
  diskId: Int;
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
}
