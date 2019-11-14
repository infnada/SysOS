import {VimFault} from './vim-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface FaultToleranceVmNotDasProtected extends VimFault {
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
  vmName: string;
}
