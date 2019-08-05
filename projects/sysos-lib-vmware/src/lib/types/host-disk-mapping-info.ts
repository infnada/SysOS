import {DynamicData} from './dynamic-data';

import {HostDiskMappingPartitionInfo} from './host-disk-mapping-partition-info';
export interface HostDiskMappingInfo extends DynamicData {
  exclusive?: boolean;
  name: string;
  physicalPartition?: HostDiskMappingPartitionInfo;
}
