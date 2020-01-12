import {DynamicData} from './dynamic-data';

import {HostCpuIdInfo} from './host-cpu-id-info';
import {Short} from './short';
import {Long} from './long';
export interface HostCpuPackage extends DynamicData {
  busHz: Long;
  cpuFeature?: HostCpuIdInfo[];
  description: string;
  hz: Long;
  index: Short;
  threadId: Short[];
  vendor: string;
}
