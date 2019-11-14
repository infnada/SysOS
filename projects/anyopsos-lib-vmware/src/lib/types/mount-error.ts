import {CustomizationFault} from './customization-fault';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface MountError extends CustomizationFault {
  diskIndex: Int;
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
}
