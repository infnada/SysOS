import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';

export interface VirtualDiskFlatVer1BackingInfo extends VirtualDeviceFileBackingInfo {
  contentId?: string;
  diskMode: string;
  split?: boolean;
  writeThrough?: boolean;
}
