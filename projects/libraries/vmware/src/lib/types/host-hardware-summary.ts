import {DynamicData} from './dynamic-data';

import {HostSystemIdentificationInfo} from './host-system-identification-info';
import {Int} from './int';
import {Short} from './short';
import {Long} from './long';
export interface HostHardwareSummary extends DynamicData {
  cpuMhz: Int;
  cpuModel: string;
  memorySize: Long;
  model: string;
  numCpuCores: Short;
  numCpuPkgs: Short;
  numCpuThreads: Short;
  numHBAs: Int;
  numNics: Int;
  otherIdentifyingInfo?: HostSystemIdentificationInfo[];
  uuid: string;
  vendor: string;
}
