import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';

import {CryptoKeyId} from './crypto-key-id';

export interface VirtualDiskSparseVer2BackingInfo extends VirtualDeviceFileBackingInfo {
  changeId?: string;
  contentId?: string;
  diskMode: string;
  keyId?: CryptoKeyId;
  parent?: VirtualDiskSparseVer2BackingInfo;
  spaceUsedInKB?: number;
  split?: boolean;
  uuid?: string;
  writeThrough?: boolean;
}