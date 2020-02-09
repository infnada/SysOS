import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostDiskPartitionSpec} from '../data/host-disk-partition-spec';


export interface ExtendVffs {
  _this: ManagedObjectReference;
  vffsPath: string;
  devicePath: string;
  spec?: HostDiskPartitionSpec;
}