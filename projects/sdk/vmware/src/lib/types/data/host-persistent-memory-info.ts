import {DynamicData} from './dynamic-data';


export interface HostPersistentMemoryInfo extends DynamicData {
  capacityInMB?: number;
  volumeUUID?: string;
}