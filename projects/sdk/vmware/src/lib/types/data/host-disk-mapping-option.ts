import {DynamicData} from './dynamic-data';

import {HostDiskMappingPartitionOption} from './host-disk-mapping-partition-option';

export interface HostDiskMappingOption extends DynamicData {
  name: string;
  physicalPartition?: HostDiskMappingPartitionOption[];
}