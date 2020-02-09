import {InvalidState} from './invalid-state';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface CannotPowerOffVmInCluster extends InvalidState {
  operation: string;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  vmName: string;
}