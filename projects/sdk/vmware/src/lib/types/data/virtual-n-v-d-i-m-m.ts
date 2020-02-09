import {VirtualDevice} from './virtual-device';


export interface VirtualNVDIMM extends VirtualDevice {
  capacityInMB: number;
}