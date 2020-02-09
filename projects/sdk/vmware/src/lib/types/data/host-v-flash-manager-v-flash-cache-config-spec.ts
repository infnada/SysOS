import {DynamicData} from './dynamic-data';


export interface HostVFlashManagerVFlashCacheConfigSpec extends DynamicData {
  defaultVFlashModule: string;
  swapCacheReservationInGB: number;
}