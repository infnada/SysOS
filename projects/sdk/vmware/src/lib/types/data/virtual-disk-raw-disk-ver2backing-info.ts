import {VirtualDeviceDeviceBackingInfo} from './virtual-device-device-backing-info';


export interface VirtualDiskRawDiskVer2BackingInfo extends VirtualDeviceDeviceBackingInfo {
  changeId?: string;
  descriptorFileName: string;
  sharing?: string;
  uuid?: string;
}