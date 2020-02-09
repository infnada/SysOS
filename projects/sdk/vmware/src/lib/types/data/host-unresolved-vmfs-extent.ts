import {DynamicData} from './dynamic-data';

import {HostScsiDiskPartition} from './host-scsi-disk-partition';

export interface HostUnresolvedVmfsExtent extends DynamicData {
  device: HostScsiDiskPartition;
  devicePath: string;
  endBlock: number;
  isHeadExtent: boolean;
  ordinal: number;
  reason: string;
  startBlock: number;
  vmfsUuid: string;
}