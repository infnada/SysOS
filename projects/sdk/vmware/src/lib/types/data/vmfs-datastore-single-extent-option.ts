import {VmfsDatastoreBaseOption} from './vmfs-datastore-base-option';

import {HostDiskPartitionBlockRange} from './host-disk-partition-block-range';

export interface VmfsDatastoreSingleExtentOption extends VmfsDatastoreBaseOption {
  vmfsExtent: HostDiskPartitionBlockRange;
}