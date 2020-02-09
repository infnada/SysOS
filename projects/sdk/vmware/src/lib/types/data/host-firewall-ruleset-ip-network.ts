import {DynamicData} from './dynamic-data';


export interface HostFirewallRulesetIpNetwork extends DynamicData {
  network: string;
  prefixLength: number;
}