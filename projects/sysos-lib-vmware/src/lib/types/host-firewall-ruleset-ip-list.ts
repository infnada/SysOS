import {DynamicData} from './dynamic-data';

import {HostFirewallRulesetIpNetwork} from './host-firewall-ruleset-ip-network';
export interface HostFirewallRulesetIpList extends DynamicData {
  allIp: boolean;
  ipAddress?: string[];
  ipNetwork?: HostFirewallRulesetIpNetwork[];
}
