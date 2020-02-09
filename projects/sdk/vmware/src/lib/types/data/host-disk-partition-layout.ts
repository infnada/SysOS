import {DynamicData} from './dynamic-data';

import {HostDiskPartitionBlockRange} from './host-disk-partition-block-range';
import {HostDiskDimensionsLba} from './host-disk-dimensions-lba';

export interface HostDiskPartitionLayout extends DynamicData {
  partition: HostDiskPartitionBlockRange[];
  total?: HostDiskDimensionsLba;
}