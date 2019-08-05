import {DynamicData} from './dynamic-data';

import {HostScsiDiskPartition} from './host-scsi-disk-partition';
import {VmfsUnmapBandwidthSpec} from './vmfs-unmap-bandwidth-spec';
import {Int} from './int';
export interface HostVmfsSpec extends DynamicData {
  blockSize?: Int;
  blockSizeMb?: Int;
  extent: HostScsiDiskPartition;
  majorVersion: Int;
  unmapBandwidthSpec?: VmfsUnmapBandwidthSpec;
  unmapGranularity?: Int;
  unmapPriority?: string;
  volumeName: string;
}
