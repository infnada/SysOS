import {DynamicData} from './dynamic-data';

import {ChoiceOption} from './choice-option';
export interface VirtualDiskDeltaDiskFormatsSupported extends DynamicData {
  datastoreType: string;
  deltaDiskFormat: ChoiceOption;
}
