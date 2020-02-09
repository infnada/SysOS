import {DynamicData} from './dynamic-data';


export interface GuestFileAttributes extends DynamicData {
  accessTime?: string;
  modificationTime?: string;
  symlinkTarget?: string;
}