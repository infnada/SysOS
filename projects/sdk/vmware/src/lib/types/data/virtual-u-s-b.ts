import {VirtualDevice} from './virtual-device';


export interface VirtualUSB extends VirtualDevice {
  connected: boolean;
  family?: string[];
  product?: number;
  speed?: string[];
  vendor?: number;
}