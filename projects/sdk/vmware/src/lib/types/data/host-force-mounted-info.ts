import {DynamicData} from './dynamic-data';


export interface HostForceMountedInfo extends DynamicData {
  mounted: boolean;
  persist: boolean;
}