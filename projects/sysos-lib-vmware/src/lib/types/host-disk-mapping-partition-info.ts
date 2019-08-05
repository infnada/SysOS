import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface HostDiskMappingPartitionInfo extends DynamicData {
  capacityInKb: Long;
  fileSystem: string;
  name: string;
}
