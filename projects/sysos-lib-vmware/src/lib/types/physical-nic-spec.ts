import {HostIpConfig} from "./host-ip-config";
import {PhysicalNicLinkInfo} from "./physical-nic-link-info";

export interface PhysicalNicSpec {
  enableEnhancedNetworkingStack?: boolean;
  ip?: 	HostIpConfig;
  linkSpeed?: PhysicalNicLinkInfo;
}
