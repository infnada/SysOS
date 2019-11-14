import {DynamicData} from './dynamic-data';

import {HostVffsVolume} from './host-vffs-volume';
import {Long} from './long';
export interface HostVFlashManagerVFlashResourceConfigInfo extends DynamicData {
  capacity: Long;
  vffs?: HostVffsVolume;
}
