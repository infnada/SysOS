import {DynamicData} from './dynamic-data';

import {HostCpuIdInfo} from './host-cpu-id-info';

export interface HostCpuPackage extends DynamicData {
  busHz: number;
  cpuFeature?: HostCpuIdInfo[];
  description: string;
  hz: number;
  index: number;
  threadId: number[];
  vendor: string;
}