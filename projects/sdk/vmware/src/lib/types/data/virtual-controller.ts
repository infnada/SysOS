import {VirtualDevice} from './virtual-device';


export interface VirtualController extends VirtualDevice {
  busNumber: number;
  device?: number[];
}