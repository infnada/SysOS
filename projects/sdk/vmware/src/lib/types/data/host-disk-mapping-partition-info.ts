import {DynamicData} from './dynamic-data';


export interface HostDiskMappingPartitionInfo extends DynamicData {
  capacityInKb: number;
  fileSystem: string;
  name: string;
}