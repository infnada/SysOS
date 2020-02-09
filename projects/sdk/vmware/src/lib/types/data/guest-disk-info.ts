import {DynamicData} from './dynamic-data';


export interface GuestDiskInfo extends DynamicData {
  capacity?: number;
  diskPath?: string;
  freeSpace?: number;
}