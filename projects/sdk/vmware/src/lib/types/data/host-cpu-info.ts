import {DynamicData} from './dynamic-data';


export interface HostCpuInfo extends DynamicData {
  hz: number;
  numCpuCores: number;
  numCpuPackages: number;
  numCpuThreads: number;
}