import {InvalidVmConfig} from './invalid-vm-config';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface VmWwnConflict extends InvalidVmConfig {
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  name?: string;
  vm?: ManagedObjectReference & { $type: 'VirtualMachine'; };
  wwn?: number;
}