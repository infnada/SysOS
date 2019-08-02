import {HostFirewallRulesetIpList} from "./host-firewall-ruleset-ip-list";

export interface HostFirewallConfigRuleSetConfig {
  allowedHosts?: HostFirewallRulesetIpList;
  enabled: boolean;
  rulesetId: string;
}
