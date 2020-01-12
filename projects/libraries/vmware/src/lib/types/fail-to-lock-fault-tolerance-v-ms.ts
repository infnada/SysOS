import {RuntimeFault} from './runtime-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface FailToLockFaultToleranceVMs extends RuntimeFault {
  alreadyLockedVm: ManagedObjectReference & { $type: 'VirtualMachine' };
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
  vmName: string;
}
