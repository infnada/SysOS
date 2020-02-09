import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';


export interface NumVirtualCpusNotSupported extends VirtualHardwareCompatibilityIssue {
  maxSupportedVcpusDest: number;
  numCpuVm: number;
}