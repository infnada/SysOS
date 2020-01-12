import {HostFileSystemVolume} from './host-file-system-volume';

import {HostScsiDiskPartition} from './host-scsi-disk-partition';
import {Int} from './int';
export interface HostVffsVolume extends HostFileSystemVolume {
  extent: HostScsiDiskPartition[];
  majorVersion: Int;
  uuid: string;
  version: string;
}
