import {DynamicData} from './dynamic-data';

import {HostRuntimeInfoNetStackInstanceRuntimeInfo} from './host-runtime-info-net-stack-instance-runtime-info';
import {HostNetworkResourceRuntime} from './host-network-resource-runtime';
export interface HostRuntimeInfoNetworkRuntimeInfo extends DynamicData {
  netStackInstanceRuntimeInfo?: HostRuntimeInfoNetStackInstanceRuntimeInfo[];
  networkResourceRuntime?: HostNetworkResourceRuntime;
}
