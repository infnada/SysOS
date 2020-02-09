import {DynamicData} from './dynamic-data';


export interface HostNumaNode extends DynamicData {
  cpuID: number[];
  memoryRangeBegin: number;
  memoryRangeLength: number;
  pciId?: string[];
  typeId: number;
}