import {DynamicData} from './dynamic-data';

import {PolicyOption} from './policy-option';
export interface ProfilePolicy extends DynamicData {
  id: string;
  policyOption: PolicyOption;
}
