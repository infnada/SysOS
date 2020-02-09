import {ManagedObjectReference} from '../data/managed-object-reference';
import {DVSNetworkResourcePoolConfigSpec} from '../data/d-v-s-network-resource-pool-config-spec';


export interface AddNetworkResourcePool {
  _this: ManagedObjectReference;
  configSpec: DVSNetworkResourcePoolConfigSpec[];
}