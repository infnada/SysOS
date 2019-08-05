import {DvsNetworkRuleAction} from './dvs-network-rule-action';
import {Int} from './int';

export interface DvsRateLimitNetworkRuleAction extends DvsNetworkRuleAction {
  packetsPerSecond: Int;
}
