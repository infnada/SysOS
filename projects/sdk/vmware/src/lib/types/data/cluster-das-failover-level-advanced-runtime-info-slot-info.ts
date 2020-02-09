import {DynamicData} from './dynamic-data';


export interface ClusterDasFailoverLevelAdvancedRuntimeInfoSlotInfo extends DynamicData {
  cpuMHz: number;
  memoryMB: number;
  numVcpus: number;
}