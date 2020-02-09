import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostFirewallRulesetRulesetSpec} from '../data/host-firewall-ruleset-ruleset-spec';


export interface UpdateRuleset {
  _this: ManagedObjectReference;
  id: string;
  spec: HostFirewallRulesetRulesetSpec;
}