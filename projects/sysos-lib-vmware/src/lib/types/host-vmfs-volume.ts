import {HostFileSystemVolume} from './host-file-system-volume';

import {HostScsiDiskPartition} from './host-scsi-disk-partition';
import {HostForceMountedInfo} from './host-force-mounted-info';
import {VmfsUnmapBandwidthSpec} from './vmfs-unmap-bandwidth-spec';
import {Int} from './int';
export interface HostVmfsVolume extends HostFileSystemVolume {
  blockSize?: Int;
  blockSizeMb: Int;
  extent: HostScsiDiskPartition[];
  forceMountedInfo?: HostForceMountedInfo;
  local?: boolean;
  majorVersion: Int;
  maxBlocks: Int;
  scsiDiskType?: string;
  ssd?: boolean;
  unmapBandwidthSpec?: VmfsUnmapBandwidthSpec;
  unmapGranularity?: Int;
  unmapPriority?: string;
  uuid: string;
  version: string;
  vmfsUpgradable: boolean;
}
