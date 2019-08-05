import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface HostVFlashManagerVFlashCacheConfigSpec extends DynamicData {
  defaultVFlashModule: string;
  swapCacheReservationInGB: Long;
}
