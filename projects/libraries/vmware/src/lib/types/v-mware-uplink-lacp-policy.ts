import {InheritablePolicy} from './inheritable-policy';

import {BoolPolicy} from './bool-policy';
import {StringPolicy} from './string-policy';
export interface VMwareUplinkLacpPolicy extends InheritablePolicy {
  enable?: BoolPolicy;
  mode?: StringPolicy;
}
