import {DynamicData} from './dynamic-data';
import {Byte} from './byte';
import {Short} from './short';

export interface HostPciDevice extends DynamicData {
  bus: Byte;
  classId: Short;
  deviceId: Short;
  deviceName: string;
  function: Byte;
  id: string;
  parentBridge?: string;
  slot: Byte;
  subDeviceId: Short;
  subVendorId: Short;
  vendorId: Short;
  vendorName: string;
}
