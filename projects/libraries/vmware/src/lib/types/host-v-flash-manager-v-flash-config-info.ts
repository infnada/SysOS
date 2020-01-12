import {DynamicData} from './dynamic-data';

import {HostVFlashManagerVFlashCacheConfigInfo} from './host-v-flash-manager-v-flash-cache-config-info';
import {HostVFlashManagerVFlashResourceConfigInfo} from './host-v-flash-manager-v-flash-resource-config-info';
export interface HostVFlashManagerVFlashConfigInfo extends DynamicData {
  vFlashCacheConfigInfo?: HostVFlashManagerVFlashCacheConfigInfo;
  vFlashResourceConfigInfo?: HostVFlashManagerVFlashResourceConfigInfo;
}
