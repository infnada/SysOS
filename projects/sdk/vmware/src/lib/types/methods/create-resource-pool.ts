import {ManagedObjectReference} from '../data/managed-object-reference';
import {ResourceConfigSpec} from '../data/resource-config-spec';


export interface CreateResourcePool {
  _this: ManagedObjectReference;
  name: string;
  spec: ResourceConfigSpec;
}