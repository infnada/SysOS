import {DynamicData} from './dynamic-data';

import {SharesOption} from './shares-option';
export interface ResourceAllocationOption extends DynamicData {
  sharesOption: SharesOption;
}
