import {DynamicData} from './dynamic-data';

import {HostFirewallRulesetIpList} from './host-firewall-ruleset-ip-list';

export interface HostFirewallConfigRuleSetConfig extends DynamicData {
  allowedHosts?: HostFirewallRulesetIpList;
  enabled: boolean;
  rulesetId: string;
}