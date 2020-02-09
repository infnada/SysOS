import {DynamicData} from './dynamic-data';


export interface HostDnsConfig extends DynamicData {
  address?: string[];
  dhcp: boolean;
  domainName: string;
  hostName: string;
  ipv6VirtualNicDevice?: string;
  searchDomain?: string[];
  virtualNicDevice?: string;
}