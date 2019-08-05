import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';
import {Int} from './int';

export interface DiskNotSupported extends VirtualHardwareCompatibilityIssue {
  disk: Int;
}
