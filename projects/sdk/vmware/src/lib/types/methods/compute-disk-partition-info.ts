import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostDiskPartitionLayout} from '../data/host-disk-partition-layout';


export interface ComputeDiskPartitionInfo {
  _this: ManagedObjectReference;
  devicePath: string;
  layout: HostDiskPartitionLayout;
  partitionFormat?: string;
}