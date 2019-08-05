import {DynamicData} from './dynamic-data';

import {HostDiskPartitionLayout} from './host-disk-partition-layout';
import {HostDiskPartitionSpec} from './host-disk-partition-spec';
export interface HostDiskPartitionInfo extends DynamicData {
  deviceName: string;
  layout: HostDiskPartitionLayout;
  spec: HostDiskPartitionSpec;
}
