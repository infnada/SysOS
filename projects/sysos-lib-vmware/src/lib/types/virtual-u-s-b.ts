import {VirtualDevice} from './virtual-device';
import {Int} from './int';

export interface VirtualUSB extends VirtualDevice {
  connected: boolean;
  family?: string[];
  product?: Int;
  speed?: string[];
  vendor?: Int;
}
