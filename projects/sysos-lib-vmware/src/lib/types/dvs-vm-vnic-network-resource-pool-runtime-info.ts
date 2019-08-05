import {DynamicData} from './dynamic-data';

import {DvsVnicAllocatedResource} from './dvs-vnic-allocated-resource';
import {Int} from './int';
export interface DvsVmVnicNetworkResourcePoolRuntimeInfo extends DynamicData {
  allocatedResource?: DvsVnicAllocatedResource[];
  available?: Int;
  capacity?: Int;
  key?: string;
  usage?: Int;
}
