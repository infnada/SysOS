import {ManagedObjectReference} from '../data/managed-object-reference';
import {DVPortgroupConfigSpec} from '../data/d-v-portgroup-config-spec';


export interface CreateDVPortgroup_Task {
  _this: ManagedObjectReference;
  spec: DVPortgroupConfigSpec;
}