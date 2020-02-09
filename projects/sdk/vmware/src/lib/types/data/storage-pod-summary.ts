import {DynamicData} from './dynamic-data';


export interface StoragePodSummary extends DynamicData {
  capacity: number;
  freeSpace: number;
  name: string;
}