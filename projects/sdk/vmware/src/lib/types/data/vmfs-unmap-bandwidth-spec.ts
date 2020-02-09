import {DynamicData} from './dynamic-data';


export interface VmfsUnmapBandwidthSpec extends DynamicData {
  dynamicMax: number;
  dynamicMin: number;
  fixedValue: number;
  policy: string;
}