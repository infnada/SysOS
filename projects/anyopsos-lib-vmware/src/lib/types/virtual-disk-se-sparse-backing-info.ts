import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';

import {CryptoKeyId} from './crypto-key-id';
import {VirtualDiskSeSparseBackingInfo} from './virtual-disk-se-sparse-backing-info';
import {Int} from './int';
export interface VirtualDiskSeSparseBackingInfo extends VirtualDeviceFileBackingInfo {
  changeId?: string;
  contentId?: string;
  deltaDiskFormat?: string;
  digestEnabled?: boolean;
  diskMode: string;
  grainSize?: Int;
  keyId?: CryptoKeyId;
  parent?: VirtualDiskSeSparseBackingInfo;
  uuid?: string;
  writeThrough?: boolean;
}
