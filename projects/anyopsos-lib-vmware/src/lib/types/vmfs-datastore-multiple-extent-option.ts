import {VmfsDatastoreBaseOption} from './vmfs-datastore-base-option';

import {HostDiskPartitionBlockRange} from './host-disk-partition-block-range';
export interface VmfsDatastoreMultipleExtentOption extends VmfsDatastoreBaseOption {
  vmfsExtent: HostDiskPartitionBlockRange[];
}
