import {ManagedObjectReference} from '../data/managed-object-reference';
import {DVPortgroupConfigSpec} from '../data/d-v-portgroup-config-spec';


export interface ReconfigureDVPortgroup_Task {
  _this: ManagedObjectReference;
  spec: DVPortgroupConfigSpec;
}