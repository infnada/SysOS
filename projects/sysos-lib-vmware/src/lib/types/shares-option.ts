import {DynamicData} from './dynamic-data';

import {SharesLevel} from './shares-level';
import {IntOption} from './int-option';
export interface SharesOption extends DynamicData {
  defaultLevel: SharesLevel;
  sharesOption: IntOption;
}
