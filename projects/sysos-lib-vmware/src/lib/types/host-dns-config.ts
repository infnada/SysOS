export interface HostDnsConfig {
  address?: string[];
  dhcp: boolean;
  domainName: string;
  hostName: string;
  ipv6VirtualNicDevice?: string;
  searchDomain?: string[];
  virtualNicDevice?: string;
}
