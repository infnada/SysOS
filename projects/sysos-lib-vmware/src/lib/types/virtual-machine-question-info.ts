import {DynamicData} from './dynamic-data';

import {ChoiceOption} from './choice-option';
import {VirtualMachineMessage} from './virtual-machine-message';
export interface VirtualMachineQuestionInfo extends DynamicData {
  choice: ChoiceOption;
  id: string;
  message?: VirtualMachineMessage[];
  text: string;
}
