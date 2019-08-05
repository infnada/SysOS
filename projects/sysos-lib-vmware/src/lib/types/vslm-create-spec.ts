import {DynamicData} from './dynamic-data';

import {VslmCreateSpecBackingSpec} from './vslm-create-spec-backing-spec';
import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';
import {Long} from './long';
export interface VslmCreateSpec extends DynamicData {
  backingSpec: VslmCreateSpecBackingSpec;
  capacityInMB: Long;
  keepAfterDeleteVm?: boolean;
  name: string;
  profile?: VirtualMachineProfileSpec[];
}
