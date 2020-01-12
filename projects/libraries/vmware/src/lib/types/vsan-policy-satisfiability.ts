import {DynamicData} from './dynamic-data';

import {VsanPolicyCost} from './vsan-policy-cost';
import {LocalizableMessage} from './localizable-message';
export interface VsanPolicySatisfiability extends DynamicData {
  cost?: VsanPolicyCost;
  isSatisfiable: boolean;
  reason?: LocalizableMessage;
  uuid?: string;
}
