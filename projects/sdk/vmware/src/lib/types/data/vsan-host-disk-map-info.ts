import {DynamicData} from './dynamic-data';

import {VsanHostDiskMapping} from './vsan-host-disk-mapping';

export interface VsanHostDiskMapInfo extends DynamicData {
  mapping: VsanHostDiskMapping;
  mounted: boolean;
}