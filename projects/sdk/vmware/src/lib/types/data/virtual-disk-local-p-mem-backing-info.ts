import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';


export interface VirtualDiskLocalPMemBackingInfo extends VirtualDeviceFileBackingInfo {
  contentId?: string;
  diskMode: string;
  uuid?: string;
  volumeUUID?: string;
}