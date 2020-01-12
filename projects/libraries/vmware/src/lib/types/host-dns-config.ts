import {DynamicData} from './dynamic-data';

export interface HostDnsConfig extends DynamicData {
  address?: string[];
  dhcp: boolean;
  domainName: string;
  hostName: string;
  searchDomain?: string[];
  virtualNicDevice?: string;
}
