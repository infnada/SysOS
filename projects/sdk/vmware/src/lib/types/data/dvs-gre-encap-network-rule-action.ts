import {DvsNetworkRuleAction} from './dvs-network-rule-action';

import {SingleIp} from './single-ip';

export interface DvsGreEncapNetworkRuleAction extends DvsNetworkRuleAction {
  encapsulationIp: SingleIp;
}