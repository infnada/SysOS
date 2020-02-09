import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostDiskPartitionSpec} from '../data/host-disk-partition-spec';


export interface UpdateDiskPartitions {
  _this: ManagedObjectReference;
  devicePath: string;
  spec: HostDiskPartitionSpec;
}