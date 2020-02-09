import {DynamicData} from './dynamic-data';


export interface DiskChangeExtent extends DynamicData {
  length: number;
  start: number;
}