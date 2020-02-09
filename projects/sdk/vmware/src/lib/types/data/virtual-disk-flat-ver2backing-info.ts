import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';

import {CryptoKeyId} from './crypto-key-id';

export interface VirtualDiskFlatVer2BackingInfo extends VirtualDeviceFileBackingInfo {
  changeId?: string;
  contentId?: string;
  deltaDiskFormat?: string;
  deltaDiskFormatVariant?: string;
  deltaGrainSize?: number;
  digestEnabled?: boolean;
  diskMode: string;
  eagerlyScrub?: boolean;
  keyId?: CryptoKeyId;
  parent?: VirtualDiskFlatVer2BackingInfo;
  sharing?: string;
  split?: boolean;
  thinProvisioned?: boolean;
  uuid?: string;
  writeThrough?: boolean;
}