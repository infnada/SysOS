import {DynamicData} from './dynamic-data';

import {HostNetworkPolicy} from './host-network-policy';
import {Int} from './int';
export interface HostPortGroupSpec extends DynamicData {
  name: string;
  policy: HostNetworkPolicy;
  vlanId: Int;
  vswitchName: string;
}
