import {DynamicData} from './dynamic-data';

import {FaultToleranceMetaSpec} from './fault-tolerance-meta-spec';
import {FaultToleranceVMConfigSpec} from './fault-tolerance-v-m-config-spec';
export interface FaultToleranceConfigSpec extends DynamicData {
  metaDataPath?: FaultToleranceMetaSpec;
  secondaryVmSpec?: FaultToleranceVMConfigSpec;
}
