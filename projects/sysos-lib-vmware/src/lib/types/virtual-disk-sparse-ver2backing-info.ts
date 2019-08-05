import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';

import {CryptoKeyId} from './crypto-key-id';
import {Long} from './long';
export interface VirtualDiskSparseVer2BackingInfo extends VirtualDeviceFileBackingInfo {
  changeId?: string;
  contentId?: string;
  diskMode: string;
  keyId?: CryptoKeyId;
  spaceUsedInKB?: Long;
  split?: boolean;
  uuid?: string;
  writeThrough?: boolean;
}
