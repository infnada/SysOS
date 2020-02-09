import {HostFileSystemVolume} from './host-file-system-volume';

import {HostScsiDiskPartition} from './host-scsi-disk-partition';

export interface HostVffsVolume extends HostFileSystemVolume {
  extent: HostScsiDiskPartition[];
  majorVersion: number;
  uuid: string;
  version: string;
}