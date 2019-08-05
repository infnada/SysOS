import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';

import {VirtualNVDIMMBackingInfo} from './virtual-n-v-d-i-m-m-backing-info';
export interface VirtualNVDIMMBackingInfo extends VirtualDeviceFileBackingInfo {
  changeId?: string;
  parent?: VirtualNVDIMMBackingInfo;
}
