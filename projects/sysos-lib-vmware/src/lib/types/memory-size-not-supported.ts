import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';
import {Int} from './int';

export interface MemorySizeNotSupported extends VirtualHardwareCompatibilityIssue {
  maxMemorySizeMB: Int;
  memorySizeMB: Int;
  minMemorySizeMB: Int;
}
