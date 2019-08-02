import {HostFirewallDefaultPolicy} from "./host-firewall-default-policy";
import {HostFirewallConfigRuleSetConfig} from "./host-firewall-config-rule-set-config";

export interface HostFirewallConfig {
  defaultBlockingPolicy: HostFirewallDefaultPolicy;
  rule?: HostFirewallConfigRuleSetConfig[]
}
