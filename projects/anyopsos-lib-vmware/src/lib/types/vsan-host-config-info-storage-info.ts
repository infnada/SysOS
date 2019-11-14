import {DynamicData} from './dynamic-data';

import {VsanHostDiskMapInfo} from './vsan-host-disk-map-info';
import {VsanHostDiskMapping} from './vsan-host-disk-mapping';
export interface VsanHostConfigInfoStorageInfo extends DynamicData {
  autoClaimStorage?: boolean;
  checksumEnabled?: boolean;
  diskMapInfo?: VsanHostDiskMapInfo[];
  diskMapping?: VsanHostDiskMapping[];
}
