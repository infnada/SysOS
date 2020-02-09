import {DynamicData} from './dynamic-data';

import {HostNetworkPolicy} from './host-network-policy';
import {HostPortGroupPort} from './host-port-group-port';
import {HostPortGroupSpec} from './host-port-group-spec';

export interface HostPortGroup extends DynamicData {
  computedPolicy: HostNetworkPolicy;
  key?: string;
  port?: HostPortGroupPort[];
  spec: HostPortGroupSpec;
  vswitch?: string;
}