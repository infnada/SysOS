import {DvsNetworkRuleAction} from './dvs-network-rule-action';
import {Int} from './int';

export interface DvsUpdateTagNetworkRuleAction extends DvsNetworkRuleAction {
  dscpTag?: Int;
  qosTag?: Int;
}
