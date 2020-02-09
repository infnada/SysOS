import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';


export interface NotEnoughCpus extends VirtualHardwareCompatibilityIssue {
  numCpuDest: number;
  numCpuVm: number;
}