import {DynamicData} from './dynamic-data';

import {HostSystemIdentificationInfo} from './host-system-identification-info';

export interface HostHardwareSummary extends DynamicData {
  cpuMhz: number;
  cpuModel: string;
  memorySize: number;
  model: string;
  numCpuCores: number;
  numCpuPkgs: number;
  numCpuThreads: number;
  numHBAs: number;
  numNics: number;
  otherIdentifyingInfo?: HostSystemIdentificationInfo[];
  uuid: string;
  vendor: string;
}