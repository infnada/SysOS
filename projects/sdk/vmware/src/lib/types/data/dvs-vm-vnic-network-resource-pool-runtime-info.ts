import {DynamicData} from './dynamic-data';

import {DvsVnicAllocatedResource} from './dvs-vnic-allocated-resource';

export interface DvsVmVnicNetworkResourcePoolRuntimeInfo extends DynamicData {
  allocatedResource?: DvsVnicAllocatedResource[];
  available?: number;
  capacity?: number;
  key: string;
  name?: string;
  status: string;
  usage?: number;
}