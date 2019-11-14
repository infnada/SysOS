import {DynamicData} from './dynamic-data';

import {HostDiskPartitionSpec} from './host-disk-partition-spec';
import {Int} from './int';
export interface HostVffsSpec extends DynamicData {
  devicePath: string;
  majorVersion: Int;
  partition?: HostDiskPartitionSpec;
  volumeName: string;
}
