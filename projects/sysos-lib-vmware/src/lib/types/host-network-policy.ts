import {HostNicTeamingPolicy} from "./host-nic-teaming-policy";
import {HostNetOffloadCapabilities} from "./host-net-offload-capabilities";
import {HostNetworkSecurityPolicy} from "./host-network-security-policy";
import {HostNetworkTrafficShapingPolicy} from "./host-network-traffic-shaping-policy";

export interface HostNetworkPolicy {
  nicTeaming?: HostNicTeamingPolicy;
  offloadPolicy?: HostNetOffloadCapabilities;
  security?: HostNetworkSecurityPolicy;
  shapingPolicy?: HostNetworkTrafficShapingPolicy;
}
