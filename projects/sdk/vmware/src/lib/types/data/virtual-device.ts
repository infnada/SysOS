import {DynamicData} from './dynamic-data';

import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';
import {VirtualDeviceConnectInfo} from './virtual-device-connect-info';
import {Description} from './description';
import {VirtualDeviceBusSlotInfo} from './virtual-device-bus-slot-info';

export interface VirtualDevice extends DynamicData {
  backing?: VirtualDeviceBackingInfo;
  connectable?: VirtualDeviceConnectInfo;
  controllerKey?: number;
  deviceInfo?: Description;
  key: number;
  slotInfo?: VirtualDeviceBusSlotInfo;
  unitNumber?: number;
}