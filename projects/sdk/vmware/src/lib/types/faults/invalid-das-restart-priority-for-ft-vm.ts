import {InvalidArgument} from './invalid-argument';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface InvalidDasRestartPriorityForFtVm extends InvalidArgument {
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  vmName: string;
}