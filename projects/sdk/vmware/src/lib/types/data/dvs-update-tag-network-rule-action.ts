import {DvsNetworkRuleAction} from './dvs-network-rule-action';


export interface DvsUpdateTagNetworkRuleAction extends DvsNetworkRuleAction {
  dscpTag?: number;
  qosTag?: number;
}