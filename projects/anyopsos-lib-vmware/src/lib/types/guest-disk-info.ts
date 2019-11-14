import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface GuestDiskInfo extends DynamicData {
  capacity?: Long;
  diskPath?: string;
  freeSpace?: Long;
}
