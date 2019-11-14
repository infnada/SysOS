import {ApplyProfile} from './apply-profile';

import {FirewallProfileRulesetProfile} from './firewall-profile-ruleset-profile';
export interface FirewallProfile extends ApplyProfile {
  ruleset?: FirewallProfileRulesetProfile[];
}
