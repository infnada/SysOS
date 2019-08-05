import {DynamicData} from './dynamic-data';

import {NumericRange} from './numeric-range';
export interface VMwareDvsLagVlanConfig extends DynamicData {
  vlanId?: NumericRange[];
}
