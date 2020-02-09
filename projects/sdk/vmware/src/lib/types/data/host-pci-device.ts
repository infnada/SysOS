import {DynamicData} from './dynamic-data';


export interface HostPciDevice extends DynamicData {
  bus: number;
  classId: number;
  deviceId: number;
  deviceName: string;
  function: number;
  id: string;
  parentBridge?: string;
  slot: number;
  subDeviceId: number;
  subVendorId: number;
  vendorId: number;
  vendorName: string;
}