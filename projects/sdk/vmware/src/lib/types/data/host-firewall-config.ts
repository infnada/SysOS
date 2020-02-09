import {DynamicData} from './dynamic-data';

import {HostFirewallDefaultPolicy} from './host-firewall-default-policy';
import {HostFirewallConfigRuleSetConfig} from './host-firewall-config-rule-set-config';

export interface HostFirewallConfig extends DynamicData {
  defaultBlockingPolicy: HostFirewallDefaultPolicy;
  rule?: HostFirewallConfigRuleSetConfig[];
}