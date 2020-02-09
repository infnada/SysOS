import {DynamicData} from './dynamic-data';

import {HostFirewallRuleDirection} from '../enums/host-firewall-rule-direction';
import {HostFirewallRulePortType} from '../enums/host-firewall-rule-port-type';

export interface HostFirewallRule extends DynamicData {
  direction: HostFirewallRuleDirection;
  endPort?: number;
  port: number;
  portType?: HostFirewallRulePortType;
  protocol: string;
}