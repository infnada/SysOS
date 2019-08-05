import {DynamicData} from './dynamic-data';

import {HostMountInfo} from './host-mount-info';
import {HostFileSystemVolume} from './host-file-system-volume';
export interface HostFileSystemMountInfo extends DynamicData {
  mountInfo: HostMountInfo;
  volume: HostFileSystemVolume;
  vStorageSupport?: string;
}
