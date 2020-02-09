import {DynamicData} from './dynamic-data';


export interface NvdimmRegionInfo extends DynamicData {
  offset: number;
  rangeType: string;
  regionId: number;
  setId: number;
  size: number;
  startAddr: number;
}