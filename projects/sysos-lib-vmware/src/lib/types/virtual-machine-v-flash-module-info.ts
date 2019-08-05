import {VirtualMachineTargetInfo} from './virtual-machine-target-info';

import {HostVFlashManagerVFlashCacheConfigInfoVFlashModuleConfigOption} from './host-v-flash-manager-v-flash-cache-config-info-v-flash-module-config-option';
export interface VirtualMachineVFlashModuleInfo extends VirtualMachineTargetInfo {
  vFlashModule: HostVFlashManagerVFlashCacheConfigInfoVFlashModuleConfigOption;
}
