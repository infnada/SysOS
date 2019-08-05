import {DynamicData} from './dynamic-data';

import {HostFirewallRuleDirection} from './host-firewall-rule-direction';
import {HostFirewallRulePortType} from './host-firewall-rule-port-type';
import {Int} from './int';
export interface HostFirewallRule extends DynamicData {
  direction: HostFirewallRuleDirection;
  endPort?: Int;
  port: Int;
  portType?: HostFirewallRulePortType;
  protocol: string;
}
