import {DynamicData} from './dynamic-data';

import {DvsNetworkRuleAction} from './dvs-network-rule-action';
import {DvsNetworkRuleQualifier} from './dvs-network-rule-qualifier';

export interface DvsTrafficRule extends DynamicData {
  action?: DvsNetworkRuleAction;
  description?: string;
  direction?: string;
  key?: string;
  qualifier?: DvsNetworkRuleQualifier[];
  sequence?: number;
}