import {DynamicData} from './dynamic-data';

import {HostVFlashManagerVFlashCacheConfigInfoVFlashModuleConfigOption} from './host-v-flash-manager-v-flash-cache-config-info-v-flash-module-config-option';

export interface HostVFlashManagerVFlashCacheConfigInfo extends DynamicData {
  defaultVFlashModule?: string;
  swapCacheReservationInGB?: number;
  vFlashModuleConfigOption?: HostVFlashManagerVFlashCacheConfigInfoVFlashModuleConfigOption[];
}