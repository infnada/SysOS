import {InvalidArgument} from './invalid-argument';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface InvalidDrsBehaviorForFtVm extends InvalidArgument {
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  vmName: string;
}