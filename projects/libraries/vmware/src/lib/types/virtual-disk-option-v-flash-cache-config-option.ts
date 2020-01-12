import {DynamicData} from './dynamic-data';

import {LongOption} from './long-option';
import {ChoiceOption} from './choice-option';
export interface VirtualDiskOptionVFlashCacheConfigOption extends DynamicData {
  blockSizeInKB: LongOption;
  cacheConsistencyType: ChoiceOption;
  cacheMode: ChoiceOption;
  reservationInMB: LongOption;
}
