
import {IpPoolIpPoolConfigInfo} from './ip-pool-ip-pool-config-info';
import {IpPoolAssociation} from './ip-pool-association';

export interface IpPool {
  allocatedIpv4Addresses?: number;
  allocatedIpv6Addresses?: number;
  availableIpv4Addresses?: number;
  availableIpv6Addresses?: number;
  dnsDomain?
        : string;
  dnsSearchPath?: string;
  hostPrefix?
        : string;
  httpProxy?
        : string;
  id?: number;
  ipv4Config?
        : IpPoolIpPoolConfigInfo;
  ipv6Config?
        : IpPoolIpPoolConfigInfo;
  name?: string;
  networkAssociation?: IpPoolAssociation[];
}