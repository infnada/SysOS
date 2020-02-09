import {DynamicData} from './dynamic-data';

import {VslmCreateSpecBackingSpec} from './vslm-create-spec-backing-spec';
import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';

export interface VslmMigrateSpec extends DynamicData {
  backingSpec: VslmCreateSpecBackingSpec;
  consolidate?: boolean;
  profile?: VirtualMachineProfileSpec[];
}