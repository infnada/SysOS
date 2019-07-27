import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';
import {VirtualDeviceConnectInfo} from './virtual-device-connect-info';
import {Description} from './description';
import {VirtualDeviceBusSlotInfo} from './virtual-device-bus-slot-info';

export interface VirtualDevice {
  backing?: VirtualDeviceBackingInfo;
  connectable?: VirtualDeviceConnectInfo;
  controllerKey?: number;
  deviceInfo?: Description;
  key: number;
  slotInfo?: VirtualDeviceBusSlotInfo;
  unitNumber?: number;
}
