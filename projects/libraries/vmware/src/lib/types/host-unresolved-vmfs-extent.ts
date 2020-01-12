import {DynamicData} from './dynamic-data';

import {HostScsiDiskPartition} from './host-scsi-disk-partition';
import {Int} from './int';
export interface HostUnresolvedVmfsExtent extends DynamicData {
  device: HostScsiDiskPartition;
  devicePath: string;
  endBlock: Int;
  isHeadExtent: boolean;
  ordinal: Int;
  reason: string;
  startBlock: Int;
  vmfsUuid: string;
}
