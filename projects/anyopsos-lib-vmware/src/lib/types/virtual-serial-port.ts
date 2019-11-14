import {VirtualDevice} from './virtual-device';

export interface VirtualSerialPort extends VirtualDevice {
  yieldOnPoll: boolean;
}
