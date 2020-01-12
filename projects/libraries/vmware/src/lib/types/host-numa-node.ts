import {DynamicData} from './dynamic-data';
import {Byte} from './byte';
import {Short} from './short';
import {Long} from './long';

export interface HostNumaNode extends DynamicData {
  cpuID: Short[];
  memoryRangeBegin: Long;
  memoryRangeLength: Long;
  pciId?: string[];
  typeId: Byte;
}
