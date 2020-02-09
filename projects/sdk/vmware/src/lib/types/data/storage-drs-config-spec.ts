import {DynamicData} from './dynamic-data';

import {StorageDrsPodConfigSpec} from './storage-drs-pod-config-spec';
import {StorageDrsVmConfigSpec} from './storage-drs-vm-config-spec';

export interface StorageDrsConfigSpec extends DynamicData {
  podConfigSpec?: StorageDrsPodConfigSpec;
  vmConfigSpec?: StorageDrsVmConfigSpec[];
}