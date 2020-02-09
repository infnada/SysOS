import {InvalidFolder} from './invalid-folder';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface VmAlreadyExistsInDatacenter extends InvalidFolder {
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  hostname: string;
  vm: ManagedObjectReference & { $type: 'VirtualMachine[]'; };
}