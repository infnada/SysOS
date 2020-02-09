import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';


export interface DeviceNotSupported extends VirtualHardwareCompatibilityIssue {
  device: string;
  reason?: string;
}