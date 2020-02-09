import {HostFileSystemVolume} from './host-file-system-volume';

import {HostScsiDiskPartition} from './host-scsi-disk-partition';
import {HostForceMountedInfo} from './host-force-mounted-info';
import {VmfsUnmapBandwidthSpec} from './vmfs-unmap-bandwidth-spec';

export interface HostVmfsVolume extends HostFileSystemVolume {
  blockSize?: number;
  blockSizeMb: number;
  extent: HostScsiDiskPartition[];
  forceMountedInfo?: HostForceMountedInfo;
  local?: boolean;
  majorVersion: number;
  maxBlocks: number;
  scsiDiskType?: string;
  ssd?: boolean;
  unmapBandwidthSpec?: VmfsUnmapBandwidthSpec;
  unmapGranularity?: number;
  unmapPriority?: string;
  uuid: string;
  version: string;
  vmfsUpgradable: boolean;
}