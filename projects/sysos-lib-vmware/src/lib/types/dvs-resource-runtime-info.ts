import {DynamicData} from './dynamic-data';

import {DvsVnicAllocatedResource} from './dvs-vnic-allocated-resource';
import {DvsVmVnicNetworkResourcePoolRuntimeInfo} from './dvs-vm-vnic-network-resource-pool-runtime-info';
import {Int} from './int';
export interface DvsResourceRuntimeInfo extends DynamicData {
  allocatedResource?: DvsVnicAllocatedResource[];
  available?: Int;
  capacity?: Int;
  usage?: Int;
  vmVnicNetworkResourcePoolRuntime?: DvsVmVnicNetworkResourcePoolRuntimeInfo[];
}
