import {DynamicData} from './dynamic-data';

import {OptionValue} from './option-value';
import {VirtualMachineRelocateSpec} from './virtual-machine-relocate-spec';

export interface VirtualMachineInstantCloneSpec extends DynamicData {
  biosUuid?: string;
  config?: OptionValue[];
  location: VirtualMachineRelocateSpec;
  name: string;
}