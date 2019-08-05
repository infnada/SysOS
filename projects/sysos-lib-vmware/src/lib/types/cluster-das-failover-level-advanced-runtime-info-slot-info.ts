import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface ClusterDasFailoverLevelAdvancedRuntimeInfoSlotInfo extends DynamicData {
  cpuMHz: Int;
  memoryMB: Int;
  numVcpus: Int;
}
