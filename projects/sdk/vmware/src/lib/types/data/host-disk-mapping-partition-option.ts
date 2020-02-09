import {DynamicData} from './dynamic-data';


export interface HostDiskMappingPartitionOption extends DynamicData {
  capacityInKb: number;
  fileSystem: string;
  name: string;
}