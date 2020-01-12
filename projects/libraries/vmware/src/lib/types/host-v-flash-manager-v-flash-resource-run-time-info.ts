import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface HostVFlashManagerVFlashResourceRunTimeInfo extends DynamicData {
  accessible: boolean;
  capacity: Long;
  capacityForVmCache: Long;
  freeForVmCache: Long;
  usage: Long;
}
