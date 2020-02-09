import {ManagedObjectReference} from '../data/managed-object-reference';
import {ResourceConfigSpec} from '../data/resource-config-spec';


export interface UpdateChildResourceConfiguration {
  _this: ManagedObjectReference;
  spec: ResourceConfigSpec[];
}