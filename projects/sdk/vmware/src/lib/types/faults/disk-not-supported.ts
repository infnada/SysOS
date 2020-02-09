import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';


export interface DiskNotSupported extends VirtualHardwareCompatibilityIssue {
  disk: number;
}