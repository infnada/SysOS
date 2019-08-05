import {VirtualDeviceFileBackingInfo} from './virtual-device-file-backing-info';

import {CryptoKeyId} from './crypto-key-id';
import {Int} from './int';
export interface VirtualDiskFlatVer2BackingInfo extends VirtualDeviceFileBackingInfo {
  changeId?: string;
  contentId?: string;
  deltaDiskFormat?: string;
  deltaDiskFormatVariant?: string;
  deltaGrainSize?: Int;
  digestEnabled?: boolean;
  diskMode: string;
  eagerlyScrub?: boolean;
  keyId?: CryptoKeyId;
  sharing?: string;
  split?: boolean;
  thinProvisioned?: boolean;
  uuid?: string;
  writeThrough?: boolean;
}
