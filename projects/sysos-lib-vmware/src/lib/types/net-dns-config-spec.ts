import {DynamicData} from './dynamic-data';

export interface NetDnsConfigSpec extends DynamicData {
  dhcp?: boolean;
  domainName?: string;
  hostName?: string;
  ipAddress?: string[];
  searchDomain?: string[];
}
