
import {HostNetworkPolicy} from './host-network-policy';

export interface HostPortGroupSpec {
  name: string;
  policy: HostNetworkPolicy;
  vlanId: number;
  vswitchName: string;
}