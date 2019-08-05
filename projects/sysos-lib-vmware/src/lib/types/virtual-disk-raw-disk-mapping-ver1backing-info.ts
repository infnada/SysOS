import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';
import {Int} from './int';

export interface VirtualDiskRawDiskMappingVer1BackingInfo extends VirtualDeviceFileBackingInfo {
  changeId?: string;
  compatibilityMode?: string;
  contentId?: string;
  deltaDiskFormat?: string;
  deltaGrainSize?: Int;
  deviceName?: string;
  diskMode?: string;
  lunUuid?: string;
  sharing?: string;
  uuid?: string;
}
