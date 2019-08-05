import {DynamicData} from './dynamic-data';

import {HostIpConfig} from './host-ip-config';
import {PhysicalNicLinkInfo} from './physical-nic-link-info';
export interface PhysicalNicSpec extends DynamicData {
  enableEnhancedNetworkingStack?: boolean;
  ip?: HostIpConfig;
  linkSpeed?: PhysicalNicLinkInfo;
}
