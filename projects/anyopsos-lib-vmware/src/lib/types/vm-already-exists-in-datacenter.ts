import {InvalidFolder} from './invalid-folder';

import {ManagedObjectReference} from './managed-object-reference';
import {ManagedObjectReference} from './managed-object-reference';
export interface VmAlreadyExistsInDatacenter extends InvalidFolder {
  host: ManagedObjectReference & { $type: 'HostSystem' };
  hostname: string;
  vm: ManagedObjectReference[] & { $type: 'VirtualMachine[]' };
}
