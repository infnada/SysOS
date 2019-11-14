import {DynamicData} from './dynamic-data';
import {DateTime} from './date-time';
import {Long} from './long';

export interface DatastoreInfo extends DynamicData {
  containerId?: string;
  freeSpace: Long;
  maxFileSize: Long;
  maxMemoryFileSize: Long;
  maxVirtualDiskCapacity?: Long;
  name: string;
  timestamp?: DateTime;
  url: string;
}
