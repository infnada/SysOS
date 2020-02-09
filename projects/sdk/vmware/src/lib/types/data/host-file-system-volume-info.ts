import {DynamicData} from './dynamic-data';

import {HostFileSystemMountInfo} from './host-file-system-mount-info';

export interface HostFileSystemVolumeInfo extends DynamicData {
  mountInfo?: HostFileSystemMountInfo[];
  volumeTypeList?: string[];
}