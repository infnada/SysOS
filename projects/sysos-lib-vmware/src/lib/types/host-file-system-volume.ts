import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface HostFileSystemVolume extends DynamicData {
  capacity: Long;
  name: string;
  type: string;
}
