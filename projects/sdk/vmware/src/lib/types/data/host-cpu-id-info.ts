import {DynamicData} from './dynamic-data';


export interface HostCpuIdInfo extends DynamicData {
  eax?: string;
  ebx?: string;
  ecx?: string;
  edx?: string;
  level: number;
  vendor?: string;
}