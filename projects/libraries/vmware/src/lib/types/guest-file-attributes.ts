import {DynamicData} from './dynamic-data';
import {DateTime} from './date-time';

export interface GuestFileAttributes extends DynamicData {
  accessTime?: DateTime;
  modificationTime?: DateTime;
  symlinkTarget?: string;
}
