import {DynamicData} from './dynamic-data';

import {HostFirewallRulesetIpList} from './host-firewall-ruleset-ip-list';
import {HostFirewallRule} from './host-firewall-rule';

export interface HostFirewallRuleset extends DynamicData {
  allowedHosts?: HostFirewallRulesetIpList;
  enabled: boolean;
  key: string;
  label: string;
  required: boolean;
  rule: HostFirewallRule[];
  service?: string;
}