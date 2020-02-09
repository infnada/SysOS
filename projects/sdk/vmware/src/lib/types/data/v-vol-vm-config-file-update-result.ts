import {DynamicData} from './dynamic-data';

import {VVolVmConfigFileUpdateResultFailedVmConfigFileInfo} from './v-vol-vm-config-file-update-result-failed-vm-config-file-info';
import {KeyValue} from './key-value';

export interface VVolVmConfigFileUpdateResult extends DynamicData {
  failedVmConfigFile?: VVolVmConfigFileUpdateResultFailedVmConfigFileInfo[];
  succeededVmConfigFile?: KeyValue[];
}