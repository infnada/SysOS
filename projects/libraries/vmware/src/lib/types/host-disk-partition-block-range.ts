import {DynamicData} from './dynamic-data';

import {HostDiskDimensionsLba} from './host-disk-dimensions-lba';
import {Int} from './int';
export interface HostDiskPartitionBlockRange extends DynamicData {
  end: HostDiskDimensionsLba;
  partition?: Int;
  start: HostDiskDimensionsLba;
  type: string;
}
