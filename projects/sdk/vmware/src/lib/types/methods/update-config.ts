import {ManagedObjectReference} from '../data/managed-object-reference';
import {ResourceConfigSpec} from '../data/resource-config-spec';


export interface UpdateConfig {
  _this: ManagedObjectReference;
  name?: string;
  config?: ResourceConfigSpec;
}