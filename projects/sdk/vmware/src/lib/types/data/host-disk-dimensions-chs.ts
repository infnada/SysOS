import {DynamicData} from './dynamic-data';


export interface HostDiskDimensionsChs extends DynamicData {
  cylinder: number;
  head: number;
  sector: number;
}