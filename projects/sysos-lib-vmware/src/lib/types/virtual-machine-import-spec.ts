import {ImportSpec} from './import-spec';

import {VirtualMachineConfigSpec} from './virtual-machine-config-spec';
import {ManagedObjectReference} from './managed-object-reference';
export interface VirtualMachineImportSpec extends ImportSpec {
  configSpec: VirtualMachineConfigSpec;
  resPoolEntity?: ManagedObjectReference & { $type: 'ResourcePool' };
}
