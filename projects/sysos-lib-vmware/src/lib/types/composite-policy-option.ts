import {PolicyOption} from './policy-option';

import {PolicyOption} from './policy-option';
export interface CompositePolicyOption extends PolicyOption {
  option?: PolicyOption[];
}
