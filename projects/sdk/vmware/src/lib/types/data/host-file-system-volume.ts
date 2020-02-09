import {DynamicData} from './dynamic-data';


export interface HostFileSystemVolume extends DynamicData {
  capacity: number;
  name: string;
  type: string;
}