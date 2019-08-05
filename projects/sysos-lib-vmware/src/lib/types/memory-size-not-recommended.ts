import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';
import {Int} from './int';

export interface MemorySizeNotRecommended extends VirtualHardwareCompatibilityIssue {
  maxMemorySizeMB: Int;
  memorySizeMB: Int;
  minMemorySizeMB: Int;
}
