import {DynamicData} from './dynamic-data';

import {DvsNetworkRuleAction} from './dvs-network-rule-action';
import {DvsNetworkRuleQualifier} from './dvs-network-rule-qualifier';
import {Int} from './int';
export interface DvsTrafficRule extends DynamicData {
  action?: DvsNetworkRuleAction;
  description?: string;
  key?: DvsNetworkRuleQualifier[];
  sequence?: Int;
}
