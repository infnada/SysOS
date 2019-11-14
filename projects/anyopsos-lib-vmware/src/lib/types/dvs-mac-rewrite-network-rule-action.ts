import {DvsNetworkRuleAction} from './dvs-network-rule-action';

export interface DvsMacRewriteNetworkRuleAction extends DvsNetworkRuleAction {
  rewriteMac: string;
}
