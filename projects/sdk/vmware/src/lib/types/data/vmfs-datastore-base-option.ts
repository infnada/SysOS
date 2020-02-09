import {DynamicData} from './dynamic-data';

import {HostDiskPartitionLayout} from './host-disk-partition-layout';

export interface VmfsDatastoreBaseOption extends DynamicData {
  layout: HostDiskPartitionLayout;
  partitionFormatChange?: boolean;
}