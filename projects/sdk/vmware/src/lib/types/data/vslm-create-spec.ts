import {DynamicData} from './dynamic-data';

import {VslmCreateSpecBackingSpec} from './vslm-create-spec-backing-spec';
import {KeyValue} from './key-value';
import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';

export interface VslmCreateSpec extends DynamicData {
  backingSpec: VslmCreateSpecBackingSpec;
  capacityInMB: number;
  keepAfterDeleteVm?: boolean;
  metadata?: KeyValue[];
  name: string;
  profile?: VirtualMachineProfileSpec[];
}