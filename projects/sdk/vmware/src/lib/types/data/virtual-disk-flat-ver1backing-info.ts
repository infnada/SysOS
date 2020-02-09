import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';


export interface VirtualDiskFlatVer1BackingInfo extends VirtualDeviceFileBackingInfo {
  contentId?: string;
  diskMode: string;
  parent?: VirtualDiskFlatVer1BackingInfo;
  split?: boolean;
  writeThrough?: boolean;
}