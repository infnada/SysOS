import {InvalidState} from './invalid-state';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface InvalidVmState extends InvalidState {
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}