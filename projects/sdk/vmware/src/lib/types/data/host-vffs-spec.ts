import {DynamicData} from './dynamic-data';

import {HostDiskPartitionSpec} from './host-disk-partition-spec';

export interface HostVffsSpec extends DynamicData {
  devicePath: string;
  majorVersion: number;
  partition?: HostDiskPartitionSpec;
  volumeName: string;
}