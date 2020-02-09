import {ApplyProfile} from './apply-profile';

import {NetworkProfileDnsConfigProfile} from './network-profile-dns-config-profile';
import {IpRouteProfile} from './ip-route-profile';

export interface NetStackInstanceProfile extends ApplyProfile {
  dnsConfig: NetworkProfileDnsConfigProfile;
  ipRouteConfig: IpRouteProfile;
  key: string;
}