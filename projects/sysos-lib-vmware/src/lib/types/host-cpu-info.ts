import {DynamicData} from './dynamic-data';
import {Short} from './short';
import {Long} from './long';

export interface HostCpuInfo extends DynamicData {
  hz: Long;
  numCpuCores: Short;
  numCpuPackages: Short;
  numCpuThreads: Short;
}
