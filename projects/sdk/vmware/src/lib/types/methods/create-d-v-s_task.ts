import {ManagedObjectReference} from '../data/managed-object-reference';
import {DVSCreateSpec} from '../data/d-v-s-create-spec';


export interface CreateDVS_Task {
  _this: ManagedObjectReference;
  spec: DVSCreateSpec;
}