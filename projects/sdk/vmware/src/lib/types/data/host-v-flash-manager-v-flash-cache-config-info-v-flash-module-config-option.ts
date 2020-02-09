import {DynamicData} from './dynamic-data';

import {LongOption} from './long-option';
import {ChoiceOption} from './choice-option';

export interface HostVFlashManagerVFlashCacheConfigInfoVFlashModuleConfigOption extends DynamicData {
  blockSizeInKBOption: LongOption;
  cacheConsistencyType: ChoiceOption;
  cacheMode: ChoiceOption;
  maxDiskSizeInKB: number;
  minSupportedModuleVersion: string;
  reservationInMBOption: LongOption;
  vFlashModule: string;
  vFlashModuleVersion: string;
}