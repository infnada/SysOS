import {VirtualDevicePciBusSlotInfo} from './virtual-device-pci-bus-slot-info';


export interface VirtualUSBControllerPciBusSlotInfo extends VirtualDevicePciBusSlotInfo {
  ehciPciSlotNumber?: number;
}