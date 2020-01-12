import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface HostPersistentMemoryInfo extends DynamicData {
  capacityInMB?: Long;
  volumeUUID?: string;
}
