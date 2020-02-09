import {DynamicData} from './dynamic-data';

import {LongOption} from './long-option';
import {SharesOption} from './shares-option';

export interface StorageIOAllocationOption extends DynamicData {
  limitOption: LongOption;
  sharesOption: SharesOption;
}