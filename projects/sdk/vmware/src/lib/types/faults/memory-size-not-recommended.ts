import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';


export interface MemorySizeNotRecommended extends VirtualHardwareCompatibilityIssue {
  maxMemorySizeMB: number;
  memorySizeMB: number;
  minMemorySizeMB: number;
}