import {DynamicData} from './dynamic-data';

import {StorageDrsPodConfigInfo} from './storage-drs-pod-config-info';
import {StorageDrsVmConfigInfo} from './storage-drs-vm-config-info';

export interface StorageDrsConfigInfo extends DynamicData {
  podConfig: StorageDrsPodConfigInfo;
  vmConfig?: StorageDrsVmConfigInfo[];
}