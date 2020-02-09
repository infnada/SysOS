import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';


export interface VirtualDiskSparseVer1BackingInfo extends VirtualDeviceFileBackingInfo {
  contentId?: string;
  diskMode: string;
  parent?: VirtualDiskSparseVer1BackingInfo;
  spaceUsedInKB?: number;
  split?: boolean;
  writeThrough?: boolean;
}