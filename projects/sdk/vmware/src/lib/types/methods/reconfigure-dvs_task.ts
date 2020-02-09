import {ManagedObjectReference} from '../data/managed-object-reference';
import {DVSConfigSpec} from '../data/d-v-s-config-spec';


export interface ReconfigureDvs_Task {
  _this: ManagedObjectReference;
  spec: DVSConfigSpec;
}