import {DynamicData} from './dynamic-data';

import {HostDiskConfigurationResult} from './host-disk-configuration-result';
import {HostVffsVolume} from './host-vffs-volume';
export interface HostVFlashResourceConfigurationResult extends DynamicData {
  devicePath?: string[];
  diskConfigurationResult?: HostDiskConfigurationResult[];
  vffs?: HostVffsVolume;
}
