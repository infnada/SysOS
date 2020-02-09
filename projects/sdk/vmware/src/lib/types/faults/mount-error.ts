import {CustomizationFault} from './customization-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface MountError extends CustomizationFault {
  diskIndex: number;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}