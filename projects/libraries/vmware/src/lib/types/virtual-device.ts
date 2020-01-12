import {DynamicData} from './dynamic-data';

import {VirtualDeviceBackingInfo} from './virtual-device-backing-info';
import {VirtualDeviceConnectInfo} from './virtual-device-connect-info';
import {Description} from './description';
import {VirtualDeviceBusSlotInfo} from './virtual-device-bus-slot-info';
import {Int} from './int';
export interface VirtualDevice extends DynamicData {
  backing?: VirtualDeviceBackingInfo;
  connectable?: VirtualDeviceConnectInfo;
  controllerKey?: Int;
  deviceInfo?: Description;
  key: Int;
  slotInfo?: VirtualDeviceBusSlotInfo;
  unitNumber?: Int;
}
