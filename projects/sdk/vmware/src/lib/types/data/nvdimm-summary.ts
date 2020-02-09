import {DynamicData} from './dynamic-data';


export interface NvdimmSummary extends DynamicData {
  availableCapacity: number;
  blockCapacity: number;
  healthStatus: string;
  numDimms: number;
  numInterleavesets: number;
  numNamespaces: number;
  persistentCapacity: number;
  totalCapacity: number;
}