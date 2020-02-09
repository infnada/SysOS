import {DynamicData} from './dynamic-data';

import {HostFirewallRulesetIpList} from './host-firewall-ruleset-ip-list';

export interface HostFirewallRulesetRulesetSpec extends DynamicData {
  allowedHosts: HostFirewallRulesetIpList;
}