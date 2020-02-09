import {DynamicData} from './dynamic-data';

import {HostVffsVolume} from './host-vffs-volume';

export interface HostVFlashManagerVFlashResourceConfigInfo extends DynamicData {
  capacity: number;
  vffs?: HostVffsVolume;
}