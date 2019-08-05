import {DynamicData} from './dynamic-data';

import {HostDiskDimensionsChs} from './host-disk-dimensions-chs';
import {HostDiskPartitionAttributes} from './host-disk-partition-attributes';
import {Long} from './long';
export interface HostDiskPartitionSpec extends DynamicData {
  chs?: HostDiskDimensionsChs;
  partition?: HostDiskPartitionAttributes[];
  partitionFormat?: string;
  totalSectors?: Long;
}
