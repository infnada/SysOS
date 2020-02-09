import {VmConfigFault} from './vm-config-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface FaultToleranceCannotEditMem extends VmConfigFault {
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  vmName: string;
}