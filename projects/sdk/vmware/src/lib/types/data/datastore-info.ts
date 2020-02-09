import {DynamicData} from './dynamic-data';


export interface DatastoreInfo extends DynamicData {
  aliasOf?: string;
  containerId?: string;
  freeSpace: number;
  maxFileSize: number;
  maxMemoryFileSize: number;
  maxVirtualDiskCapacity?: number;
  name: string;
  timestamp?: string;
  url: string;
}