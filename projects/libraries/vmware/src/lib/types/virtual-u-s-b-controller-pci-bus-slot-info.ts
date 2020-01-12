import {VirtualDevicePciBusSlotInfo} from './virtual-device-pci-bus-slot-info';
import {Int} from './int';

export interface VirtualUSBControllerPciBusSlotInfo extends VirtualDevicePciBusSlotInfo {
  ehciPciSlotNumber?: Int;
}
