import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostScsiDiskPartition} from '../data/host-scsi-disk-partition';
import {HostDiskPartitionBlockRange} from '../data/host-disk-partition-block-range';


export interface ComputeDiskPartitionInfoForResize {
  _this: ManagedObjectReference;
  partition: HostScsiDiskPartition;
  blockRange: HostDiskPartitionBlockRange;
  partitionFormat?: string;
}