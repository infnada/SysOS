import {HostFirewallRulesetIpNetwork} from './host-firewall-ruleset-ip-network';

export interface HostFirewallRulesetIpList {
  allIp: boolean;
  ipAddress: string[];
  ipNetwork: HostFirewallRulesetIpNetwork[];
}
