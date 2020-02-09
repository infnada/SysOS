import {DynamicData} from './dynamic-data';

import {HostDiskDimensionsLba} from './host-disk-dimensions-lba';

export interface HostDiskPartitionBlockRange extends DynamicData {
  end: HostDiskDimensionsLba;
  partition?: number;
  start: HostDiskDimensionsLba;
  type: string;
}