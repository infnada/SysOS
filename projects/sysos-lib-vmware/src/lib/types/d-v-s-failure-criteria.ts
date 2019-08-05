import {InheritablePolicy} from './inheritable-policy';

import {BoolPolicy} from './bool-policy';
import {StringPolicy} from './string-policy';
import {IntPolicy} from './int-policy';
export interface DVSFailureCriteria extends InheritablePolicy {
  checkBeacon?: BoolPolicy;
  checkDuplex?: BoolPolicy;
  checkErrorPercent?: BoolPolicy;
  checkSpeed?: StringPolicy;
  fullDuplex?: BoolPolicy;
  percentage?: IntPolicy;
  speed?: IntPolicy;
}
