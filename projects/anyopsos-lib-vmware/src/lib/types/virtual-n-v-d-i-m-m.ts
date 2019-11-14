import {VirtualDevice} from './virtual-device';
import {Long} from './long';

export interface VirtualNVDIMM extends VirtualDevice {
  capacityInMB: Long;
}
