import {DynamicData} from './dynamic-data';

import {ChoiceOption} from './choice-option';
import {LongOption} from './long-option';

export interface VirtualMachineVMCIDeviceOptionFilterSpecOption extends DynamicData {
  action: ChoiceOption;
  direction: ChoiceOption;
  lowerDstPortBoundary: LongOption;
  protocol: ChoiceOption;
  upperDstPortBoundary: LongOption;
}