import {VirtualDeviceBusSlotInfo} from './virtual-device-bus-slot-info';


export interface VirtualDevicePciBusSlotInfo extends VirtualDeviceBusSlotInfo {
  pciSlotNumber: number;
}