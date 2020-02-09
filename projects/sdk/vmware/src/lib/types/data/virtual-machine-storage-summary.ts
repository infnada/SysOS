import {DynamicData} from './dynamic-data';


export interface VirtualMachineStorageSummary extends DynamicData {
  committed: number;
  timestamp: string;
  uncommitted: number;
  unshared: number;
}