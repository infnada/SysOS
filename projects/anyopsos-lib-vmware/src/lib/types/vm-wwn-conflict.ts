import {InvalidVmConfig} from './invalid-vm-config';

import {ManagedObjectReference} from './managed-object-reference';
import {ManagedObjectReference} from './managed-object-reference';
import {Long} from './long';
export interface VmWwnConflict extends InvalidVmConfig {
  host?: ManagedObjectReference & { $type: 'HostSystem' };
  name?: string;
  vm?: ManagedObjectReference & { $type: 'VirtualMachine' };
  wwn?: Long;
}
