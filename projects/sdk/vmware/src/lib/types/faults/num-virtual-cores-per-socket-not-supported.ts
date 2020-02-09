import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';


export interface NumVirtualCoresPerSocketNotSupported extends VirtualHardwareCompatibilityIssue {
  maxSupportedCoresPerSocketDest: number;
  numCoresPerSocketVm: number;
}