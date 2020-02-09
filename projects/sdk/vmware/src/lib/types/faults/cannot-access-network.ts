import {CannotAccessVmDevice} from './cannot-access-vm-device';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface CannotAccessNetwork extends CannotAccessVmDevice {
  network?: ManagedObjectReference & { $type: 'Network'; };
}