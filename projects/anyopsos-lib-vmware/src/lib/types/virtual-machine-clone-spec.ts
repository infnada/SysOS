import {DynamicData} from './dynamic-data';

import {VirtualMachineConfigSpec} from './virtual-machine-config-spec';
import {CustomizationSpec} from './customization-spec';
import {VirtualMachineRelocateSpec} from './virtual-machine-relocate-spec';
import {ManagedObjectReference} from './managed-object-reference';
export interface VirtualMachineCloneSpec extends DynamicData {
  config?: VirtualMachineConfigSpec;
  customization?: CustomizationSpec;
  location: VirtualMachineRelocateSpec;
  memory?: boolean;
  powerOn: boolean;
  snapshot?: ManagedObjectReference & { $type: 'VirtualMachineSnapshot' };
  template: boolean;
}
