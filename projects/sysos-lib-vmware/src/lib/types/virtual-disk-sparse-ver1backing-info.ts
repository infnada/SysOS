import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';
import {Long} from './long';

export interface VirtualDiskSparseVer1BackingInfo extends VirtualDeviceFileBackingInfo {
  contentId?: string;
  diskMode: string;
  spaceUsedInKB?: Long;
  split?: boolean;
  writeThrough?: boolean;
}
