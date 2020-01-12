import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';
import {Int} from './int';

export interface NotEnoughCpus extends VirtualHardwareCompatibilityIssue {
  numCpuDest: Int;
  numCpuVm: Int;
}
