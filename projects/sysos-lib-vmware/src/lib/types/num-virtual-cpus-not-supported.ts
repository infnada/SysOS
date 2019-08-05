import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';
import {Int} from './int';

export interface NumVirtualCpusNotSupported extends VirtualHardwareCompatibilityIssue {
  maxSupportedVcpusDest: Int;
  numCpuVm: Int;
}
