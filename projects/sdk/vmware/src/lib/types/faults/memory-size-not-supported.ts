import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';


export interface MemorySizeNotSupported extends VirtualHardwareCompatibilityIssue {
  maxMemorySizeMB: number;
  memorySizeMB: number;
  minMemorySizeMB: number;
}