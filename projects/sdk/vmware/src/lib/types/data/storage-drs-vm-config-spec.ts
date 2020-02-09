import {ArrayUpdateSpec} from './array-update-spec';

import {StorageDrsVmConfigInfo} from './storage-drs-vm-config-info';

export interface StorageDrsVmConfigSpec extends ArrayUpdateSpec {
  info?: StorageDrsVmConfigInfo;
}