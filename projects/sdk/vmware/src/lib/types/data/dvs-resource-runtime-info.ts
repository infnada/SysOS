import {DynamicData} from './dynamic-data';

import {DvsVnicAllocatedResource} from './dvs-vnic-allocated-resource';
import {DvsVmVnicNetworkResourcePoolRuntimeInfo} from './dvs-vm-vnic-network-resource-pool-runtime-info';

export interface DvsResourceRuntimeInfo extends DynamicData {
  allocatedResource?: DvsVnicAllocatedResource[];
  available?: number;
  capacity?: number;
  usage?: number;
  vmVnicNetworkResourcePoolRuntime?: DvsVmVnicNetworkResourcePoolRuntimeInfo[];
}