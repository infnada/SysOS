import {DvsNetworkRuleAction} from './dvs-network-rule-action';


export interface DvsRateLimitNetworkRuleAction extends DvsNetworkRuleAction {
  packetsPerSecond: number;
}