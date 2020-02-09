import {DynamicData} from './dynamic-data';

import {HostScsiDiskPartition} from './host-scsi-disk-partition';
import {VmfsUnmapBandwidthSpec} from './vmfs-unmap-bandwidth-spec';

export interface HostVmfsSpec extends DynamicData {
  blockSize?: number;
  blockSizeMb?: number;
  extent: HostScsiDiskPartition;
  majorVersion: number;
  unmapBandwidthSpec?: VmfsUnmapBandwidthSpec;
  unmapGranularity?: number;
  unmapPriority?: string;
  volumeName: string;
}