import {VirtualDevice} from './virtual-device';
import {Int} from './int';

export interface VirtualController extends VirtualDevice {
  busNumber: Int;
  device?: Int[];
}
