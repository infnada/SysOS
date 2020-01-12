import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';
import {Int} from './int';

export interface NumVirtualCoresPerSocketNotSupported extends VirtualHardwareCompatibilityIssue {
  maxSupportedCoresPerSocketDest: Int;
  numCoresPerSocketVm: Int;
}
