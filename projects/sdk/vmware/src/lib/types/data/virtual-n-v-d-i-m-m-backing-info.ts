import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';


export interface VirtualNVDIMMBackingInfo extends VirtualDeviceFileBackingInfo {
  changeId?: string;
  parent?: VirtualNVDIMMBackingInfo;
}