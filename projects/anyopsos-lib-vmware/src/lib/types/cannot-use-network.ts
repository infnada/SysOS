import {VmConfigFault} from './vm-config-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface CannotUseNetwork extends VmConfigFault {
  backing: string;
  connected: boolean;
  device: string;
  network?: ManagedObjectReference & { $type: 'Network' };
  reason: string;
}
