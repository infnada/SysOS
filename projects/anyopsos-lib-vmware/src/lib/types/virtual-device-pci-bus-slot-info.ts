import {VirtualDeviceBusSlotInfo} from './virtual-device-bus-slot-info';
import {Int} from './int';

export interface VirtualDevicePciBusSlotInfo extends VirtualDeviceBusSlotInfo {
  pciSlotNumber: Int;
}
