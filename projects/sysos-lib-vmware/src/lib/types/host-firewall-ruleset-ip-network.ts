import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostFirewallRulesetIpNetwork extends DynamicData {
  network: string;
  prefixLength: Int;
}
