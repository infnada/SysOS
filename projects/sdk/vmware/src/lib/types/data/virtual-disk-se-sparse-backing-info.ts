import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';

import {CryptoKeyId} from './crypto-key-id';

export interface VirtualDiskSeSparseBackingInfo extends VirtualDeviceFileBackingInfo {
  changeId?: string;
  contentId?: string;
  deltaDiskFormat?: string;
  digestEnabled?: boolean;
  diskMode: string;
  grainSize?: number;
  keyId?: CryptoKeyId;
  parent?: VirtualDiskSeSparseBackingInfo;
  uuid?: string;
  writeThrough?: boolean;
}