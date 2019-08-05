import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostCpuIdInfo extends DynamicData {
  eax?: string;
  ebx?: string;
  ecx?: string;
  edx?: string;
  level: Int;
  vendor?: string;
}
