import {DynamicData} from './dynamic-data';

import {HostFirewallDefaultPolicy} from './host-firewall-default-policy';
import {HostFirewallRuleset} from './host-firewall-ruleset';
export interface HostFirewallInfo extends DynamicData {
  defaultPolicy: HostFirewallDefaultPolicy;
  ruleset?: HostFirewallRuleset[];
}
