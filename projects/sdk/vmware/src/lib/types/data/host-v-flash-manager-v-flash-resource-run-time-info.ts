import {DynamicData} from './dynamic-data';


export interface HostVFlashManagerVFlashResourceRunTimeInfo extends DynamicData {
  accessible: boolean;
  capacity: number;
  capacityForVmCache: number;
  freeForVmCache: number;
  usage: number;
}