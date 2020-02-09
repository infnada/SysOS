import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';


export interface VirtualDiskRawDiskMappingVer1BackingInfo extends VirtualDeviceFileBackingInfo {
  changeId?: string;
  compatibilityMode?: string;
  contentId?: string;
  deltaDiskFormat?: string;
  deltaGrainSize?: number;
  deviceName?: string;
  diskMode?: string;
  lunUuid?: string;
  parent?: VirtualDiskRawDiskMappingVer1BackingInfo;
  sharing?: string;
  uuid?: string;
}